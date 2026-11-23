import 'dotenv/config';

import os from 'node:os';
import path from 'node:path';

import express from 'express';

import { createApiApp } from './server/api.ts';
import { createFileCampaignStore } from './server/campaignStore.ts';
import { createGeminiVideoGenerator } from './server/geminiVideoGenerator.ts';
import { createVideoService } from './server/videoJobs.ts';

/**
 * One process serves the campaign API (POST/GET /api/campaigns) and the app itself: in development through Vite, in
 * production from the built dist folder.
 */

const PORT = Number(process.env.PORT ?? 3000);
const MAX_CAMPAIGNS = Number(process.env.MAX_CAMPAIGNS ?? 200);
const RATE_LIMIT_PER_MINUTE = Number(process.env.RATE_LIMIT_PER_MINUTE ?? 120);
const MAX_VIDEOS_PER_DAY = Number(process.env.MAX_VIDEOS_PER_DAY ?? 3);
// Google renames Veo models now and then; this is the faster, cheaper one. Override with VEO_MODEL.
const DEFAULT_VEO_MODEL = 'veo-3.1-fast-generate-preview';
const ONE_MINUTE_MS = 60_000;
// The container's disk is wiped when the instance is replaced, so stored campaigns are previews, not an archive.
const dataDir = process.env.DATA_DIR ?? path.join(os.tmpdir(), 'adforge-campaigns');
const isProduction = process.env.NODE_ENV === 'production';

// Video rendering costs money per clip, so it exists only when a model key is set, and is capped per day.
const geminiKey = process.env.GEMINI_API_KEY;
const video =
  geminiKey === undefined || geminiKey === ''
    ? undefined
    : createVideoService({
        dir: path.join(dataDir, 'videos'),
        generator: createGeminiVideoGenerator({ apiKey: geminiKey, model: process.env.VEO_MODEL ?? DEFAULT_VEO_MODEL }),
        maxPerDay: MAX_VIDEOS_PER_DAY,
      });

const app = createApiApp({
  ingestToken: process.env.AD_INGEST_TOKEN,
  video,
  store: createFileCampaignStore({ dir: dataDir, maxItems: MAX_CAMPAIGNS }),
  appUrl: process.env.APP_URL,
  rateLimit: { limit: RATE_LIMIT_PER_MINUTE, windowMs: ONE_MINUTE_MS },
});

if (isProduction) {
  const distDir = path.resolve(process.cwd(), 'dist');
  app.use(express.static(distDir));
  app.get('*', (_request, response) => response.sendFile(path.join(distDir, 'index.html')));
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.error(`AdForge listening on port ${PORT} (${isProduction ? 'production' : 'development'}), campaigns in ${dataDir}`);
});
