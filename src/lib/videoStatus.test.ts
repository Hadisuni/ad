import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { fetchVideoStatus, isCampaignId, videoFileUrl } from './videoStatus.ts';

const ID = 'ab12'.repeat(8);
const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

describe('fetchVideoStatus', () => {
  test('asks for the status of this campaign', async () => {
    let requested = '';
    await fetchVideoStatus(ID, async (url) => {
      requested = url;
      return reply(404, { success: false });
    });
    assert.equal(requested, `/api/campaigns/${ID}/video`);
  });

  test('says none when no video was started', async () => {
    assert.deepEqual(await fetchVideoStatus(ID, async () => reply(404, { success: false })), { status: 'none' });
  });

  test('says running while the video is being made', async () => {
    assert.deepEqual(await fetchVideoStatus(ID, async () => reply(200, { success: true, data: { status: 'running' } })), { status: 'running' });
  });

  test('says done when the video is ready', async () => {
    assert.deepEqual(await fetchVideoStatus(ID, async () => reply(200, { success: true, data: { status: 'done' } })), { status: 'done' });
  });

  test('passes on why a video failed', async () => {
    const result = await fetchVideoStatus(ID, async () => reply(200, { success: true, data: { status: 'failed', error: 'blocked' } }));
    assert.deepEqual(result, { status: 'failed', error: 'blocked' });
  });

  test('says unavailable for a server error or a network failure', async () => {
    assert.deepEqual(await fetchVideoStatus(ID, async () => reply(500, {})), { status: 'unavailable' });
    assert.deepEqual(
      await fetchVideoStatus(ID, async () => {
        throw new TypeError('offline');
      }),
      { status: 'unavailable' },
    );
  });
});

describe('videoFileUrl and isCampaignId', () => {
  test('builds the address of the video file', () => {
    assert.equal(videoFileUrl(ID), `/api/campaigns/${ID}/video/file`);
  });

  test('recognises only the 32 hex characters the server issues', () => {
    assert.equal(isCampaignId(ID), true);
    assert.equal(isCampaignId('sunai-receptionist'), false);
  });
});
