import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';

import { buildVideoRequest } from '../src/lib/videoPrompt.ts';
import { createApiApp } from './api.ts';
import { createFileCampaignStore } from './campaignStore.ts';
import { createVideoService, type VideoGenerator, type VideoPoll } from './videoJobs.ts';

const TOKEN = 'test-token-0123456789-abcdefghij';
const MP4_BYTES = new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112, 109, 112, 52, 50]);

/** A stand-in for the video model: counts calls and answers whatever the test sets. */
function fakeGenerator() {
  const state = { starts: 0, polls: 0, next: { state: 'running' } as VideoPoll };
  const generator: VideoGenerator = {
    async start() {
      state.starts += 1;
      return `operations/op-${state.starts}`;
    },
    async poll() {
      state.polls += 1;
      return state.next;
    },
  };
  return { generator, state };
}

const request = buildVideoRequest({
  id: 'c',
  brandName: 'B',
  tagline: 't',
  targetNiche: 'n',
  targetAudience: 'a',
  region: 'r',
  offer: 'o',
  tone: 'Bold & Disruptive',
  language: 'en',
  squareImage: '/images/a.jpg',
  verticalImage: '/images/b.jpg',
  landscapeImage: '/images/c.jpg',
  metaFeed: { hook: 'h', body: 'b', bullets: ['x'], cta: 'c', hashtags: [] },
  reelsStory: { hookSeconds: 'Open.', storyScript: 'Story.', overlayBadge: 'b', audioSuggestion: 'a', ctaAction: 'c' },
  linkedinB2B: { headline: 'h', problem: 'p', solution: 's', proofPoints: ['a'], ctaButton: 'b' },
  googleSearch: { headline1: 'a', headline2: 'b', headline3: 'c', description1: 'd', description2: 'e', displayPath: 'x', sitelinks: [] },
  coldOutreach: { subjectLine: 's', openingLine: 'o', body: 'b', callToAction: 'c' },
});

const ID_A = 'a'.repeat(32);
const ID_B = 'b'.repeat(32);
const ID_C = 'c'.repeat(32);

describe('video service', () => {
  let dir: string;
  before(async () => {
    dir = await mkdtemp(path.join(tmpdir(), 'adforge-video-'));
  });
  after(() => rm(dir, { recursive: true, force: true }));

  test('starts a job and remembers the model operation', async () => {
    const { generator } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't1'), generator, maxPerDay: 5 });
    const result = await service.start(ID_A, request);
    assert.equal(result.kind, 'started');
    assert.equal(result.kind === 'started' && result.job.status, 'running');
    assert.equal((await service.status(ID_A))?.operationName, 'operations/op-1');
  });

  test('keeps asking the model while it is still working', async () => {
    const { generator, state } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't2'), generator, maxPerDay: 5 });
    await service.start(ID_A, request);
    assert.equal((await service.status(ID_A))?.status, 'running');
    assert.equal(state.polls, 1);
  });

  test('saves the video when the model is done', async () => {
    const { generator, state } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't3'), generator, maxPerDay: 5 });
    await service.start(ID_A, request);
    state.next = { state: 'done', bytes: MP4_BYTES };
    assert.equal((await service.status(ID_A))?.status, 'done');
    assert.deepEqual(new Uint8Array(await readFile(service.filePath(ID_A))), MP4_BYTES);
    // A finished job is not asked about again.
    const pollsBefore = state.polls;
    await service.status(ID_A);
    assert.equal(state.polls, pollsBefore);
  });

  test('does not start a second job for a campaign that already has one running or done', async () => {
    const { generator, state } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't4'), generator, maxPerDay: 5 });
    await service.start(ID_A, request);
    const again = await service.start(ID_A, request);
    assert.equal(again.kind, 'existing');
    assert.equal(state.starts, 1);
  });

  test('records a failure and lets the job be tried again', async () => {
    const { generator, state } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't5'), generator, maxPerDay: 5 });
    await service.start(ID_A, request);
    state.next = { state: 'failed', error: 'blocked by safety filter' };
    const failed = await service.status(ID_A);
    assert.equal(failed?.status, 'failed');
    assert.equal(failed?.error, 'blocked by safety filter');

    const retry = await service.start(ID_A, request);
    assert.equal(retry.kind, 'started');
    assert.equal(state.starts, 2);
  });

  test('stops at the daily limit and allows jobs again the next day', async () => {
    const { generator } = fakeGenerator();
    let now = Date.parse('2026-11-23T10:00:00Z');
    const service = createVideoService({ dir: path.join(dir, 't6'), generator, maxPerDay: 2, now: () => now });
    assert.equal((await service.start(ID_A, request)).kind, 'started');
    assert.equal((await service.start(ID_B, request)).kind, 'started');
    assert.equal((await service.start(ID_C, request)).kind, 'limit');

    now = Date.parse('2026-11-24T00:30:00Z');
    assert.equal((await service.start(ID_C, request)).kind, 'started');
  });

  test('gives up on a clip that is still not ready after 30 minutes', async () => {
    const { generator } = fakeGenerator();
    let now = Date.parse('2026-11-23T10:00:00Z');
    const service = createVideoService({ dir: path.join(dir, 't8'), generator, maxPerDay: 5, now: () => now });
    await service.start(ID_A, request);
    now += 31 * 60_000;
    const job = await service.status(ID_A);
    assert.equal(job?.status, 'failed');
    assert.ok(job?.error?.includes('30 minutes'));
  });

  test('keeps the job running when the question to the model fails once', async () => {
    const { generator } = fakeGenerator();
    const flaky: VideoGenerator = {
      start: generator.start,
      poll: async () => {
        throw new Error('network down');
      },
    };
    const service = createVideoService({ dir: path.join(dir, 't9'), generator: flaky, maxPerDay: 5 });
    await service.start(ID_A, request);
    assert.equal((await service.status(ID_A))?.status, 'running');
  });

  test('answers null for a campaign with no job', async () => {
    const { generator } = fakeGenerator();
    const service = createVideoService({ dir: path.join(dir, 't7'), generator, maxPerDay: 5 });
    assert.equal(await service.status(ID_A), null);
  });
});

const sampleCampaign = {
  brandName: 'SunAI Systems',
  tagline: 'AI receptionist',
  targetNiche: 'Local clinics',
  targetAudience: 'Owners',
  region: 'Canada',
  offer: 'Trial',
  tone: 'Executive & Trustworthy',
  language: 'en',
  squareImage: '/images/a.jpg',
  verticalImage: '/images/b.jpg',
  landscapeImage: '/images/c.jpg',
  metaFeed: { hook: 'Hook', body: 'Body', bullets: ['One'], cta: 'Call', hashtags: ['#AI'] },
  reelsStory: { hookSeconds: 'Opening.', storyScript: 'A story.', overlayBadge: 'Badge', audioSuggestion: 'Audio', ctaAction: 'Tap' },
  linkedinB2B: { headline: 'H', problem: 'P', solution: 'S', proofPoints: ['A'], ctaButton: 'Book' },
  googleSearch: { headline1: 'H1', headline2: 'H2', headline3: 'H3', description1: 'D1', description2: 'D2', displayPath: 'x.com', sitelinks: [] },
  coldOutreach: { subjectLine: 'S', openingLine: 'O', body: 'B', callToAction: 'C' },
};

interface Harness {
  readonly baseUrl: string;
  readonly generatorState: ReturnType<typeof fakeGenerator>['state'];
  readonly close: () => Promise<void>;
}

async function startHarness(options: { withVideo: boolean; maxPerDay?: number }): Promise<Harness> {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'adforge-videoapi-'));
  const { generator, state } = fakeGenerator();
  const app = createApiApp({
    ingestToken: TOKEN,
    store: createFileCampaignStore({ dir: dataDir, maxItems: 50 }),
    appUrl: 'https://ads.example.com',
    rateLimit: { limit: 1000, windowMs: 60_000 },
    video: options.withVideo ? createVideoService({ dir: path.join(dataDir, 'videos'), generator, maxPerDay: options.maxPerDay ?? 5 }) : undefined,
  });
  const server: Server = await new Promise((resolve) => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  const { port } = server.address() as AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    generatorState: state,
    close: async () => {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await rm(dataDir, { recursive: true, force: true });
    },
  };
}

async function createCampaign(baseUrl: string): Promise<string> {
  const response = await fetch(`${baseUrl}/api/campaigns`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(sampleCampaign),
  });
  return (await response.json()).data.id;
}

const startVideo = (baseUrl: string, id: string, token: string | null = TOKEN) =>
  fetch(`${baseUrl}/api/campaigns/${id}/video`, { method: 'POST', headers: token === null ? {} : { authorization: `Bearer ${token}` } });

describe('video routes', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({ withVideo: true, maxPerDay: 2 });
  });
  after(() => harness.close());

  test('refuses to start a video without the token', async () => {
    const id = await createCampaign(harness.baseUrl);
    assert.equal((await startVideo(harness.baseUrl, id, null)).status, 401);
  });

  test('answers 404 when the campaign does not exist', async () => {
    assert.equal((await startVideo(harness.baseUrl, 'd'.repeat(32))).status, 404);
  });

  test('starts a video, then reports progress and serves the file when it is done', async () => {
    const id = await createCampaign(harness.baseUrl);
    const started = await startVideo(harness.baseUrl, id);
    assert.equal(started.status, 202);
    assert.equal((await started.json()).data.status, 'running');

    const noFileYet = await fetch(`${harness.baseUrl}/api/campaigns/${id}/video/file`);
    assert.equal(noFileYet.status, 404);

    const running = await (await fetch(`${harness.baseUrl}/api/campaigns/${id}/video`)).json();
    assert.equal(running.data.status, 'running');
    assert.equal(running.data.url, undefined);

    harness.generatorState.next = { state: 'done', bytes: MP4_BYTES };
    const done = await (await fetch(`${harness.baseUrl}/api/campaigns/${id}/video`)).json();
    assert.equal(done.data.status, 'done');
    assert.equal(done.data.url, `https://ads.example.com/api/campaigns/${id}/video/file`);

    const file = await fetch(`${harness.baseUrl}/api/campaigns/${id}/video/file`);
    assert.equal(file.status, 200);
    assert.equal(file.headers.get('content-type'), 'video/mp4');
    assert.deepEqual(new Uint8Array(await file.arrayBuffer()), MP4_BYTES);
  });

  test('says there is no video for a campaign nobody started one for', async () => {
    const id = await createCampaign(harness.baseUrl);
    const response = await fetch(`${harness.baseUrl}/api/campaigns/${id}/video`);
    assert.equal(response.status, 404);
  });

  test('answers 429 when the daily limit is used up', async () => {
    harness.generatorState.next = { state: 'running' };
    const first = await createCampaign(harness.baseUrl);
    const second = await createCampaign(harness.baseUrl);
    await startVideo(harness.baseUrl, first);
    const limited = await startVideo(harness.baseUrl, second);
    assert.equal(limited.status, 429);
  });
});

describe('video routes without a video service', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({ withVideo: false });
  });
  after(() => harness.close());

  test('is switched off, not open', async () => {
    const id = await createCampaign(harness.baseUrl);
    assert.equal((await startVideo(harness.baseUrl, id)).status, 503);
  });
});
