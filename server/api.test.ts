import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, describe, test } from 'node:test';

import { createApiApp } from './api.ts';
import { createFileCampaignStore } from './campaignStore.ts';

const TOKEN = 'test-token-0123456789-abcdefghij';
const MAX_STORED = 3;

const validCampaign = () => ({
  brandName: 'SunAI Systems',
  tagline: '24/7 AI Phone Receptionist',
  targetNiche: 'Local clinics',
  targetAudience: 'Clinic owners',
  region: 'Canada',
  offer: '14-day free trial',
  tone: 'Executive & Trustworthy',
  language: 'en',
  squareImage: 'https://cdn.example.com/square.jpg',
  verticalImage: '/images/vertical.jpg',
  landscapeImage: '/src/assets/images/landscape.jpg',
  metaFeed: { hook: 'Hook', body: 'Body', bullets: ['One', 'Two'], cta: 'Call', hashtags: ['#AI'] },
  reelsStory: { hookSeconds: 'Hook', storyScript: 'Script', overlayBadge: 'Badge', audioSuggestion: 'Audio', ctaAction: 'Tap' },
  linkedinB2B: { headline: 'H', problem: 'P', solution: 'S', proofPoints: ['A'], ctaButton: 'Book' },
  googleSearch: {
    headline1: 'H1',
    headline2: 'H2',
    headline3: 'H3',
    description1: 'D1',
    description2: 'D2',
    displayPath: 'example.com/path',
    sitelinks: [{ title: 'T', desc: 'D' }],
  },
  coldOutreach: { subjectLine: 'S', openingLine: 'O', body: 'B', callToAction: 'C' },
});

interface Harness {
  readonly baseUrl: string;
  readonly dataDir: string;
  readonly close: () => Promise<void>;
}

async function startHarness(options: { ingestToken?: string; rateLimit?: { limit: number; windowMs: number } }): Promise<Harness> {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'adforge-test-'));
  const store = createFileCampaignStore({ dir: dataDir, maxItems: MAX_STORED });
  const app = createApiApp({
    ingestToken: options.ingestToken,
    store,
    appUrl: 'https://ads.example.com',
    rateLimit: options.rateLimit ?? { limit: 1000, windowMs: 60_000 },
  });
  const server: Server = await new Promise((resolve) => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  const { port } = server.address() as AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    dataDir,
    close: async () => {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await rm(dataDir, { recursive: true, force: true });
    },
  };
}

const post = (baseUrl: string, body: unknown, token: string | null = TOKEN) =>
  fetch(`${baseUrl}/api/campaigns`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(token === null ? {} : { authorization: `Bearer ${token}` }) },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/campaigns', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({ ingestToken: TOKEN });
  });
  after(() => harness.close());

  test('rejects a request without a token', async () => {
    const response = await post(harness.baseUrl, validCampaign(), null);
    assert.equal(response.status, 401);
    assert.equal((await response.json()).success, false);
  });

  test('rejects a wrong token', async () => {
    const response = await post(harness.baseUrl, validCampaign(), 'wrong-token-0123456789-abcdefghij');
    assert.equal(response.status, 401);
  });

  test('stores a valid campaign and returns its id and preview link', async () => {
    const response = await post(harness.baseUrl, validCampaign());
    const body = await response.json();
    assert.equal(response.status, 201);
    assert.equal(body.success, true);
    assert.match(body.data.id, /^[a-f0-9]{32}$/);
    assert.equal(body.data.previewUrl, `https://ads.example.com/?c=${body.data.id}`);

    const stored = await fetch(`${harness.baseUrl}/api/campaigns/${body.data.id}`);
    const storedBody = await stored.json();
    assert.equal(stored.status, 200);
    assert.equal(storedBody.data.campaign.id, body.data.id);
    assert.equal(storedBody.data.campaign.brandName, 'SunAI Systems');
  });

  test('refuses an unknown tone and names the field', async () => {
    const response = await post(harness.baseUrl, { ...validCampaign(), tone: 'Shouty' });
    const body = await response.json();
    assert.equal(response.status, 400);
    assert.ok(body.error.includes('tone'));
  });

  test('refuses an image address that is not https or a bundled image', async () => {
    const response = await post(harness.baseUrl, { ...validCampaign(), squareImage: 'javascript:alert(1)' });
    assert.equal(response.status, 400);
  });

  test('refuses an image path that climbs out of the images folder', async () => {
    const response = await post(harness.baseUrl, { ...validCampaign(), verticalImage: '/images/../../etc/passwd' });
    assert.equal(response.status, 400);
  });

  test('refuses text that is not JSON', async () => {
    const response = await post(harness.baseUrl, '{not json');
    assert.equal(response.status, 400);
  });

  test('refuses a body over the size limit', async () => {
    const response = await post(harness.baseUrl, { ...validCampaign(), tagline: 'x'.repeat(400_000) });
    assert.equal(response.status, 413);
  });

  test('keeps only the newest campaigns', async () => {
    for (let index = 0; index < MAX_STORED + 2; index += 1) {
      const response = await post(harness.baseUrl, { ...validCampaign(), brandName: `Brand ${index}` });
      assert.equal(response.status, 201);
    }
    const files = await readdir(harness.dataDir);
    assert.equal(files.filter((name) => name.endsWith('.json')).length, MAX_STORED);
  });
});

describe('POST /api/campaigns without a configured token', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({});
  });
  after(() => harness.close());

  test('is switched off rather than open', async () => {
    const response = await post(harness.baseUrl, validCampaign());
    assert.equal(response.status, 503);
  });

  test('health says sending is off', async () => {
    const body = await (await fetch(`${harness.baseUrl}/api/health`)).json();
    assert.deepEqual(body, { success: true, data: { ingestEnabled: false } });
  });
});

describe('GET /api/campaigns/:id', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({ ingestToken: TOKEN });
  });
  after(() => harness.close());

  test('answers 404 for an id that was never stored', async () => {
    const response = await fetch(`${harness.baseUrl}/api/campaigns/${'a'.repeat(32)}`);
    assert.equal(response.status, 404);
  });

  test('answers 404 for an id that is not 32 hex characters', async () => {
    const response = await fetch(`${harness.baseUrl}/api/campaigns/..%2F..%2Fpackage`);
    assert.equal(response.status, 404);
  });
});

describe('rate limit', () => {
  let harness: Harness;
  before(async () => {
    harness = await startHarness({ ingestToken: TOKEN, rateLimit: { limit: 2, windowMs: 60_000 } });
  });
  after(() => harness.close());

  test('answers 429 once a caller passes the limit', async () => {
    const statuses: number[] = [];
    for (let index = 0; index < 3; index += 1) {
      statuses.push((await fetch(`${harness.baseUrl}/api/health`)).status);
    }
    assert.deepEqual(statuses, [200, 200, 429]);
  });
});
