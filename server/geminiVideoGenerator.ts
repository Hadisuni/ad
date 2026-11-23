import { randomBytes } from 'node:crypto';
import { readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { GenerateVideosOperation, GoogleGenAI } from '@google/genai';

import type { VideoGenerator } from './videoJobs.ts';

/**
 * The real video model: Google's Veo through the Gemini API. This is the one part of the video feature that the unit
 * tests cannot run (it needs a key and each clip costs money), so it is kept thin: everything that decides anything
 * lives in videoJobs.ts, which the tests do cover.
 */

export interface GeminiVideoOptions {
  readonly apiKey: string;
  /** A Veo model id; set VEO_MODEL to change it when Google renames or retires one. */
  readonly model: string;
}

export function createGeminiVideoGenerator({ apiKey, model }: GeminiVideoOptions): VideoGenerator {
  const ai = new GoogleGenAI({ apiKey });

  return {
    async start(request) {
      const operation = await ai.models.generateVideos({
        model,
        prompt: request.prompt,
        config: {
          numberOfVideos: 1,
          aspectRatio: request.aspectRatio,
          durationSeconds: request.durationSeconds,
          negativePrompt: request.negativePrompt,
        },
      });
      if (operation.name === undefined) throw new Error('the video model did not return an operation name');
      return operation.name;
    },

    async poll(operationName) {
      const pending = new GenerateVideosOperation();
      pending.name = operationName;
      const operation = await ai.operations.getVideosOperation({ operation: pending });
      if (operation.done !== true) return { state: 'running' };
      if (operation.error !== undefined) {
        return { state: 'failed', error: String((operation.error as { message?: unknown }).message ?? 'the video model reported an error') };
      }
      const video = operation.response?.generatedVideos?.[0]?.video;
      if (video === undefined) {
        const reasons = operation.response?.raiMediaFilteredReasons?.join('; ');
        return { state: 'failed', error: reasons ? `the video was blocked: ${reasons}` : 'the video model returned no video' };
      }
      const temporary = path.join(os.tmpdir(), `adforge-veo-${randomBytes(6).toString('hex')}.mp4`);
      try {
        await ai.files.download({ file: video, downloadPath: temporary });
        return { state: 'done', bytes: new Uint8Array(await readFile(temporary)) };
      } finally {
        await rm(temporary, { force: true });
      }
    },
  };
}
