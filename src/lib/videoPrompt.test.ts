import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import type { AdCampaign } from '../types/ads.ts';
import { buildVideoRequest } from './videoPrompt.ts';

const campaign = (): AdCampaign => ({
  id: 'c1',
  brandName: 'SunAI Systems',
  tagline: 'AI phone receptionist',
  targetNiche: 'Local clinics',
  targetAudience: 'Clinic owners',
  region: 'Canada',
  offer: 'Free trial',
  tone: 'Executive & Trustworthy',
  language: 'en',
  squareImage: '/images/a.jpg',
  verticalImage: '/images/b.jpg',
  landscapeImage: '/images/c.jpg',
  metaFeed: { hook: 'h', body: 'b', bullets: ['x'], cta: 'c', hashtags: [] },
  reelsStory: {
    hookSeconds: 'It was 10:42 PM on a Sunday.',
    storyScript: 'A client called to book a procedure. Nobody was at the desk, yet the booking was confirmed.',
    overlayBadge: 'Booked automatically',
    audioSuggestion: 'Lo-fi',
    ctaAction: 'Tap',
  },
  linkedinB2B: { headline: 'h', problem: 'p', solution: 's', proofPoints: ['a'], ctaButton: 'b' },
  googleSearch: { headline1: 'a', headline2: 'b', headline3: 'c', description1: 'd', description2: 'e', displayPath: 'x', sitelinks: [] },
  coldOutreach: { subjectLine: 's', openingLine: 'o', body: 'b', callToAction: 'c' },
});

describe('buildVideoRequest', () => {
  test('makes a vertical 8 second clip', () => {
    const request = buildVideoRequest(campaign());
    assert.equal(request.aspectRatio, '9:16');
    assert.equal(request.durationSeconds, 8);
  });

  test('builds the scene from the campaign story and opening line', () => {
    const { prompt } = buildVideoRequest(campaign());
    assert.ok(prompt.includes('It was 10:42 PM on a Sunday.'));
    assert.ok(prompt.includes('A client called to book a procedure.'));
    assert.ok(prompt.includes('Local clinics'));
  });

  test('keeps text, logos and captions out, since the model cannot spell them', () => {
    const { prompt, negativePrompt } = buildVideoRequest(campaign());
    assert.ok(prompt.toLowerCase().includes('no on-screen text'));
    for (const word of ['text', 'subtitles', 'logo', 'watermark']) {
      assert.ok(negativePrompt.includes(word), word);
    }
  });

  test('changes the look with the tone', () => {
    const calm = buildVideoRequest(campaign()).prompt;
    const urgent = buildVideoRequest({ ...campaign(), tone: 'Urgent & High-Converting' }).prompt;
    assert.notEqual(calm, urgent);
  });

  test('clips a very long story so the prompt stays within the model limit', () => {
    const long = { ...campaign(), reelsStory: { ...campaign().reelsStory, storyScript: 'word '.repeat(500) } };
    assert.ok(buildVideoRequest(long).prompt.length <= 1500);
  });
});
