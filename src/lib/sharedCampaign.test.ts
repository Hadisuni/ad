import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { campaignIdFromSearch, fetchSharedCampaign } from './sharedCampaign.ts';

const ID = 'ab12'.repeat(8);

const jsonResponse = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

describe('campaignIdFromSearch', () => {
  test('reads the id from ?c=', () => {
    assert.equal(campaignIdFromSearch(`?c=${ID}`), ID);
  });

  test('reads the id when other parameters are present', () => {
    assert.equal(campaignIdFromSearch(`?utm=x&c=${ID}`), ID);
  });

  test('returns null when there is no id', () => {
    assert.equal(campaignIdFromSearch(''), null);
  });

  test('returns null for an id that is not 32 hex characters', () => {
    assert.equal(campaignIdFromSearch('?c=../../etc'), null);
    assert.equal(campaignIdFromSearch('?c=abc'), null);
  });
});

describe('fetchSharedCampaign', () => {
  test('returns the campaign the server has', async () => {
    const campaign = { id: ID, brandName: 'SunAI Systems' };
    let requested = '';
    const result = await fetchSharedCampaign(ID, async (url) => {
      requested = String(url);
      return jsonResponse(200, { success: true, data: { campaign } });
    });
    assert.equal(requested, `/api/campaigns/${ID}`);
    assert.deepEqual(result, { status: 'ready', campaign });
  });

  test('says not found for a 404', async () => {
    const result = await fetchSharedCampaign(ID, async () => jsonResponse(404, { success: false, error: 'campaign not found' }));
    assert.deepEqual(result, { status: 'error', reason: 'notFound' });
  });

  test('says failed for a server error', async () => {
    const result = await fetchSharedCampaign(ID, async () => jsonResponse(500, { success: false }));
    assert.deepEqual(result, { status: 'error', reason: 'failed' });
  });

  test('says failed when the network call throws', async () => {
    const result = await fetchSharedCampaign(ID, async () => {
      throw new TypeError('network down');
    });
    assert.deepEqual(result, { status: 'error', reason: 'failed' });
  });

  test('says failed when the answer has no campaign in it', async () => {
    const result = await fetchSharedCampaign(ID, async () => jsonResponse(200, { success: true, data: {} }));
    assert.deepEqual(result, { status: 'error', reason: 'failed' });
  });
});
