import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import type { AdCampaign } from '../types/ads.ts';
import { checkCampaign, imageAlt } from './adChecks.ts';

const clean = (): AdCampaign => ({
  id: 'c1',
  brandName: 'SunAI Systems',
  tagline: 'AI phone receptionist',
  targetNiche: 'Clinics',
  targetAudience: 'Owners',
  region: 'Canada',
  offer: 'Free trial',
  tone: 'Executive & Trustworthy',
  language: 'en',
  squareImage: '/images/a.jpg',
  verticalImage: '/images/b.jpg',
  landscapeImage: '/images/c.jpg',
  squareImageAlt: 'A receptionist desk with a ringing phone',
  verticalImageAlt: 'A phone lit up at night on an empty desk',
  landscapeImageAlt: 'A boardroom with a glass wall and a city view',
  metaFeed: {
    hook: 'Every missed call is a lost customer.',
    body: 'SunAI answers every call and books the appointment for you.',
    bullets: ['Answers fast'],
    cta: 'Listen to a live demo',
    hashtags: ['#AIReceptionist', '#SmallBusiness'],
  },
  reelsStory: { hookSeconds: 'It was 10 PM.', storyScript: 'A client called.', overlayBadge: 'Booked', audioSuggestion: 'Lo-fi', ctaAction: 'Tap' },
  linkedinB2B: { headline: 'Fewer missed calls, no extra hires.', problem: 'Calls get missed.', solution: 'SunAI answers.', proofPoints: ['A'], ctaButton: 'Book' },
  googleSearch: {
    headline1: 'SunAI Phone Receptionist',
    headline2: 'Never Miss a Call',
    headline3: 'Plans in CAD',
    description1: 'An AI receptionist that answers calls and books appointments.',
    description2: 'Listen to a live voice demo.',
    displayPath: 'sunaisystems.com/ai-receptionist',
    sitelinks: [],
  },
  coldOutreach: { subjectLine: 'Quick question', openingLine: 'Hi {{first_name}}', body: 'Body', callToAction: 'Reply' },
});

const ids = (campaign: AdCampaign) => checkCampaign(campaign).map((check) => check.id);

describe('checkCampaign', () => {
  test('finds nothing to fix in a clean campaign', () => {
    assert.deepEqual(checkCampaign(clean()), []);
  });

  test('flags a Google headline over 30 characters as an error', () => {
    const campaign = { ...clean(), googleSearch: { ...clean().googleSearch, headline1: 'x'.repeat(31) } };
    const found = checkCampaign(campaign).find((check) => check.id === 'google-headline-length');
    assert.equal(found?.severity, 'error');
  });

  test('accepts a Google headline of exactly 30 characters', () => {
    const campaign = { ...clean(), googleSearch: { ...clean().googleSearch, headline1: 'SunAI ' + 'x'.repeat(24) } };
    assert.ok(!ids(campaign).includes('google-headline-length'));
  });

  test('flags a Google description over 90 characters', () => {
    const campaign = { ...clean(), googleSearch: { ...clean().googleSearch, description1: 'SunAI ' + 'x'.repeat(90) } };
    assert.ok(ids(campaign).includes('google-description-length'));
  });

  test('flags duplicate Google headlines regardless of case', () => {
    const campaign = { ...clean(), googleSearch: { ...clean().googleSearch, headline2: 'sunai phone receptionist' } };
    assert.ok(ids(campaign).includes('google-duplicate-headlines'));
  });

  test('notes when the brand name is nowhere in the Google ad', () => {
    const search = { ...clean().googleSearch, headline1: 'AI Phone Receptionist', description1: 'Answers calls and books appointments.' };
    assert.ok(ids({ ...clean(), googleSearch: search }).includes('google-brand-missing'));
  });

  test('warns when the Instagram hook is longer than what shows before "more"', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, hook: 'x'.repeat(126) } };
    assert.ok(ids(campaign).includes('meta-hook-length'));
  });

  test('flags an Instagram caption over 2200 characters as an error', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, body: 'x'.repeat(2300) } };
    assert.equal(checkCampaign(campaign).find((check) => check.id === 'meta-caption-length')?.severity, 'error');
  });

  test('warns above 10 hashtags and errors above 30', () => {
    const many = (count: number) => Array.from({ length: count }, (_, index) => `#tag${index}`);
    const warn = checkCampaign({ ...clean(), metaFeed: { ...clean().metaFeed, hashtags: many(11) } });
    const error = checkCampaign({ ...clean(), metaFeed: { ...clean().metaFeed, hashtags: many(31) } });
    assert.equal(warn.find((check) => check.id === 'meta-hashtag-count')?.severity, 'warn');
    assert.equal(error.find((check) => check.id === 'meta-hashtag-count')?.severity, 'error');
  });

  test('flags a hashtag with a space or without the #', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, hashtags: ['#good', '#two words', 'nohash'] } };
    assert.ok(ids(campaign).includes('meta-hashtag-format'));
  });

  test('accepts Persian hashtags', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, hashtags: ['#منشی_هوشمند'] } };
    assert.ok(!ids(campaign).includes('meta-hashtag-format'));
  });

  test('warns about a LinkedIn headline over 70 characters', () => {
    const campaign = { ...clean(), linkedinB2B: { ...clean().linkedinB2B, headline: 'x'.repeat(71) } };
    assert.ok(ids(campaign).includes('linkedin-headline-length'));
  });

  test('warns about an email subject over 60 characters', () => {
    const campaign = { ...clean(), coldOutreach: { ...clean().coldOutreach, subjectLine: 'x'.repeat(61) } };
    assert.ok(ids(campaign).includes('email-subject-length'));
  });

  test('warns when the language is Persian but the copy is English', () => {
    assert.ok(ids({ ...clean(), language: 'fa' }).includes('language-mismatch'));
  });

  test('warns when the language is English but the copy is Persian', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, body: 'منشی هوشمند به همه تماس‌ها جواب می‌دهد و وقت می‌گیرد' } };
    assert.ok(ids(campaign).includes('language-mismatch'));
  });

  test('warns about a percentage or dollar figure so it gets checked against a source', () => {
    const campaign = { ...clean(), metaFeed: { ...clean().metaFeed, body: '62% of callers hang up and each lost call costs $1,500.' } };
    const found = checkCampaign(campaign).find((check) => check.id === 'unsourced-claim');
    assert.equal(found?.severity, 'warn');
    assert.ok(found?.message.en.includes('62%'));
  });

  test('warns for each image that has no alt text', () => {
    const campaign = { ...clean(), squareImageAlt: undefined, landscapeImageAlt: '  ' };
    assert.deepEqual(
      ids(campaign).filter((id) => id.startsWith('alt-missing')),
      ['alt-missing-square', 'alt-missing-landscape'],
    );
  });

  test('warns about alt text over 125 characters', () => {
    assert.ok(ids({ ...clean(), squareImageAlt: 'x'.repeat(126) }).includes('alt-length-square'));
  });

  test('notes alt text that only repeats the brand or starts with "image of"', () => {
    assert.ok(ids({ ...clean(), squareImageAlt: 'SunAI Systems' }).includes('alt-quality-square'));
    assert.ok(ids({ ...clean(), verticalImageAlt: 'Image of a phone on a desk' }).includes('alt-quality-vertical'));
  });

  test('gives every message in English and Persian', () => {
    const campaign = { ...clean(), squareImageAlt: undefined, googleSearch: { ...clean().googleSearch, headline1: 'x'.repeat(40) } };
    for (const check of checkCampaign(campaign)) {
      assert.ok(check.message.en.length > 0 && check.message.fa.length > 0);
    }
  });
});

describe('imageAlt', () => {
  test('returns the alt text the campaign gives', () => {
    assert.equal(imageAlt(clean(), 'square'), 'A receptionist desk with a ringing phone');
  });

  test('falls back to the brand and tagline when there is no alt text', () => {
    assert.equal(imageAlt({ ...clean(), squareImageAlt: undefined }, 'square'), 'SunAI Systems: AI phone receptionist');
  });
});
