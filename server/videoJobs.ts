import { randomBytes } from 'node:crypto';
import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { VideoRequest } from '../src/lib/videoPrompt.ts';
import { isCampaignId } from './campaignStore.ts';

/**
 * Video ads. A job asks the video model for a clip, and the clip is fetched when the model is done. There is no
 * background worker: each status request asks the model once, so a job moves forward when someone looks at it. Jobs are
 * capped per day because every clip costs money.
 */

export type VideoPoll =
  | { readonly state: 'running' }
  | { readonly state: 'done'; readonly bytes: Uint8Array }
  | { readonly state: 'failed'; readonly error: string };

/** The video model behind the jobs; the Gemini one is in geminiVideoGenerator.ts, tests use a fake. */
export interface VideoGenerator {
  /** Starts a clip and returns the id the model gives the work. */
  start(request: VideoRequest): Promise<string>;
  poll(operationName: string): Promise<VideoPoll>;
}

export interface VideoJob {
  readonly campaignId: string;
  readonly status: 'running' | 'done' | 'failed';
  readonly operationName: string;
  readonly startedAt: string;
  readonly error?: string;
}

export type StartResult =
  | { readonly kind: 'started'; readonly job: VideoJob }
  | { readonly kind: 'existing'; readonly job: VideoJob }
  | { readonly kind: 'limit' };

export interface VideoService {
  start(campaignId: string, request: VideoRequest): Promise<StartResult>;
  status(campaignId: string): Promise<VideoJob | null>;
  /** Where the finished clip is on disk; only meaningful once the job is done. */
  filePath(campaignId: string): string;
}

export interface VideoServiceOptions {
  readonly dir: string;
  readonly generator: VideoGenerator;
  /** The most clips started in one UTC day, failed ones included. */
  readonly maxPerDay: number;
  readonly now?: () => number;
}

const JOB_SUFFIX = '.job.json';
/** A clip that has not come back after this long is given up on. */
const MAX_RUNNING_MS = 30 * 60_000;

export function createVideoService({ dir, generator, maxPerDay, now = Date.now }: VideoServiceOptions): VideoService {
  const jobFile = (id: string) => path.join(dir, `${id}${JOB_SUFFIX}`);
  const videoFile = (id: string) => path.join(dir, `${id}.mp4`);

  // Starts are handled one at a time so two requests cannot both pass the daily limit or both start the same campaign.
  let queue: Promise<unknown> = Promise.resolve();
  const inOrder = <T,>(work: () => Promise<T>): Promise<T> => {
    const next = queue.then(work, work);
    queue = next.catch(() => undefined);
    return next;
  };

  async function readJob(id: string): Promise<VideoJob | null> {
    if (!isCampaignId(id)) return null;
    try {
      return JSON.parse(await readFile(jobFile(id), 'utf8')) as VideoJob;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  }

  async function writeAtomically(target: string, content: string | Uint8Array): Promise<void> {
    await mkdir(dir, { recursive: true });
    const temporary = `${target}.${randomBytes(4).toString('hex')}.tmp`;
    await writeFile(temporary, content);
    await rename(temporary, target);
  }

  const saveJob = (job: VideoJob) => writeAtomically(jobFile(job.campaignId), JSON.stringify(job));

  async function startedToday(): Promise<number> {
    const today = new Date(now()).toISOString().slice(0, 10);
    let names: string[];
    try {
      names = (await readdir(dir)).filter((name) => name.endsWith(JOB_SUFFIX));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return 0;
      throw error;
    }
    const jobs = await Promise.all(names.map(async (name) => JSON.parse(await readFile(path.join(dir, name), 'utf8')) as VideoJob));
    return jobs.filter((job) => job.startedAt.startsWith(today)).length;
  }

  return {
    start: (campaignId, request) =>
      inOrder(async (): Promise<StartResult> => {
        const existing = await readJob(campaignId);
        if (existing !== null && existing.status !== 'failed') return { kind: 'existing', job: existing };
        if ((await startedToday()) >= maxPerDay) return { kind: 'limit' };
        const operationName = await generator.start(request);
        const job: VideoJob = { campaignId, status: 'running', operationName, startedAt: new Date(now()).toISOString() };
        await saveJob(job);
        return { kind: 'started', job };
      }),

    async status(campaignId) {
      const job = await readJob(campaignId);
      if (job === null || job.status !== 'running') return job;

      const tooLong = now() - Date.parse(job.startedAt) > MAX_RUNNING_MS;
      let outcome: VideoPoll;
      try {
        outcome = await generator.poll(job.operationName);
      } catch (error) {
        // A failed question is not a failed clip: keep the job running and let the next look ask again.
        console.error('video poll failed', error);
        outcome = { state: 'running' };
      }

      if (outcome.state === 'done') {
        await writeAtomically(videoFile(campaignId), outcome.bytes);
        const done: VideoJob = { ...job, status: 'done' };
        await saveJob(done);
        return done;
      }
      if (outcome.state === 'failed' || tooLong) {
        const failed: VideoJob = { ...job, status: 'failed', error: outcome.state === 'failed' ? outcome.error : 'the video was not ready after 30 minutes' };
        await saveJob(failed);
        return failed;
      }
      return job;
    },

    filePath: videoFile,
  };
}
