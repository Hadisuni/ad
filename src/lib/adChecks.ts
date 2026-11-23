import type { AdCampaign } from '../types/ads.ts';

/**
 * Checks a campaign against the limits and habits that decide whether an ad is accepted, shown in full and found:
 * Google responsive search ad lengths, Instagram caption and hashtag rules, LinkedIn and email lengths, alt text on the
 * images, copy in the wrong language, and numbers that need a source. The same function runs in the app (the checks
 * panel) and on the server (the reply to POST /api/campaigns), so n8n sees what the screen shows.
 */

export type CheckSeverity = 'error' | 'warn' | 'info';
export type CheckPlatform = 'google' | 'meta' | 'linkedin' | 'email' | 'images' | 'general';
export type ImageKind = 'square' | 'vertical' | 'landscape';

export interface Check {
  readonly id: string;
  readonly severity: CheckSeverity;
  readonly platform: CheckPlatform;
  readonly message: { readonly en: string; readonly fa: string };
}

const GOOGLE_HEADLINE_MAX = 30;
const GOOGLE_DESCRIPTION_MAX = 90;
const INSTAGRAM_CAPTION_MAX = 2200;
const INSTAGRAM_HOOK_VISIBLE = 125;
const HASHTAGS_WARN_ABOVE = 10;
const HASHTAGS_MAX = 30;
const LINKEDIN_HEADLINE_MAX = 70;
const EMAIL_SUBJECT_MAX = 60;
const ALT_MAX = 125;
const PERSIAN_SHARE_EXPECTED_MIN = 0.2;
const PERSIAN_SHARE_UNEXPECTED_MAX = 0.3;
const MAX_CLAIMS_LISTED = 4;

const HASHTAG = /^#[\p{L}\p{N}_]+$/u;
const CLAIM = /\d+(?:[.,]\d+)?\s?%|\$\s?\d[\d,.]*/g;
const ALT_PREFIX = /^(an? )?(image|picture|photo|photograph|graphic) of\b/i;

const IMAGE_KINDS: readonly ImageKind[] = ['square', 'vertical', 'landscape'];

const length = (text: string) => [...text].length;
const altOf = (campaign: AdCampaign, kind: ImageKind): string => (campaign[`${kind}ImageAlt` as const] ?? '').trim();

/** The alt text to put on an image: the campaign's own, or the brand and tagline when it gave none. */
export function imageAlt(campaign: AdCampaign, kind: ImageKind): string {
  return altOf(campaign, kind) || `${campaign.brandName}: ${campaign.tagline}`;
}

function persianShare(text: string): number {
  const letters = text.match(/\p{L}/gu)?.length ?? 0;
  if (letters === 0) return 0;
  return (text.match(/\p{Script=Arabic}/gu)?.length ?? 0) / letters;
}

function googleChecks(campaign: AdCampaign): readonly Check[] {
  const { headline1, headline2, headline3, description1, description2 } = campaign.googleSearch;
  const headlines = [headline1, headline2, headline3];
  const found: Check[] = [];

  const longHeadlines = headlines.filter((headline) => length(headline) > GOOGLE_HEADLINE_MAX);
  if (longHeadlines.length > 0) {
    found.push({
      id: 'google-headline-length',
      severity: 'error',
      platform: 'google',
      message: {
        en: `${longHeadlines.length} Google headline(s) are over ${GOOGLE_HEADLINE_MAX} characters, so Google will reject the ad.`,
        fa: `${longHeadlines.length} عنوان گوگل بیشتر از ${GOOGLE_HEADLINE_MAX} نویسه است و گوگل آگهی را رد می‌کند.`,
      },
    });
  }
  if ([description1, description2].some((description) => length(description) > GOOGLE_DESCRIPTION_MAX)) {
    found.push({
      id: 'google-description-length',
      severity: 'error',
      platform: 'google',
      message: {
        en: `A Google description is over ${GOOGLE_DESCRIPTION_MAX} characters.`,
        fa: `یکی از توضیحات گوگل بیشتر از ${GOOGLE_DESCRIPTION_MAX} نویسه است.`,
      },
    });
  }
  const normalised = headlines.map((headline) => headline.trim().toLowerCase());
  if (new Set(normalised).size < normalised.length) {
    found.push({
      id: 'google-duplicate-headlines',
      severity: 'error',
      platform: 'google',
      message: { en: 'Two Google headlines are the same; Google needs distinct ones.', fa: 'دو عنوان گوگل یکسان‌اند؛ گوگل عنوان‌های متفاوت می‌خواهد.' },
    });
  }
  const adText = [...headlines, description1, description2].join(' ').toLowerCase();
  // Ads usually say "SunAI", not "SunAI Systems", so the first word of the brand counts as the brand being there.
  const brand = campaign.brandName.trim().toLowerCase();
  const brandFirstWord = brand.split(/\s+/)[0];
  if (brand !== '' && !adText.includes(brand) && !adText.includes(brandFirstWord)) {
    found.push({
      id: 'google-brand-missing',
      severity: 'info',
      platform: 'google',
      message: { en: 'The brand name is not in the Google ad text.', fa: 'نام برند در متن آگهی گوگل نیست.' },
    });
  }
  return found;
}

function metaChecks(campaign: AdCampaign): readonly Check[] {
  const { hook, body, cta, hashtags } = campaign.metaFeed;
  const found: Check[] = [];

  if (length(hook) > INSTAGRAM_HOOK_VISIBLE) {
    found.push({
      id: 'meta-hook-length',
      severity: 'warn',
      platform: 'meta',
      message: {
        en: `The hook is over ${INSTAGRAM_HOOK_VISIBLE} characters; the rest is hidden behind "more" in the feed.`,
        fa: `هوک بیشتر از ${INSTAGRAM_HOOK_VISIBLE} نویسه است و بقیه‌اش پشت «بیشتر» پنهان می‌شود.`,
      },
    });
  }
  if (length([hook, body, cta, hashtags.join(' ')].join('\n')) > INSTAGRAM_CAPTION_MAX) {
    found.push({
      id: 'meta-caption-length',
      severity: 'error',
      platform: 'meta',
      message: { en: `The caption is over Instagram's ${INSTAGRAM_CAPTION_MAX} character limit.`, fa: `کپشن از حد ${INSTAGRAM_CAPTION_MAX} نویسه‌ی اینستاگرام بیشتر است.` },
    });
  }
  if (hashtags.length > HASHTAGS_WARN_ABOVE) {
    const tooMany = hashtags.length > HASHTAGS_MAX;
    found.push({
      id: 'meta-hashtag-count',
      severity: tooMany ? 'error' : 'warn',
      platform: 'meta',
      message: {
        en: tooMany ? `${hashtags.length} hashtags; Instagram allows at most ${HASHTAGS_MAX}.` : `${hashtags.length} hashtags is a lot; a handful that fit the post work better.`,
        fa: tooMany ? `${hashtags.length} هشتگ؛ اینستاگرام حداکثر ${HASHTAGS_MAX} می‌پذیرد.` : `${hashtags.length} هشتگ زیاد است؛ چند هشتگ مرتبط بهتر کار می‌کند.`,
      },
    });
  }
  if (hashtags.some((tag) => !HASHTAG.test(tag))) {
    found.push({
      id: 'meta-hashtag-format',
      severity: 'error',
      platform: 'meta',
      message: { en: 'A hashtag has a space or symbol, or no # at the start, so it will not link.', fa: 'یک هشتگ فاصله یا نماد دارد یا با # شروع نمی‌شود و لینک نمی‌شود.' },
    });
  }
  return found;
}

function otherCopyChecks(campaign: AdCampaign): readonly Check[] {
  const found: Check[] = [];
  if (length(campaign.linkedinB2B.headline) > LINKEDIN_HEADLINE_MAX) {
    found.push({
      id: 'linkedin-headline-length',
      severity: 'warn',
      platform: 'linkedin',
      message: { en: `The LinkedIn headline is over ${LINKEDIN_HEADLINE_MAX} characters and gets cut off.`, fa: `عنوان لینکدین بیشتر از ${LINKEDIN_HEADLINE_MAX} نویسه است و بریده می‌شود.` },
    });
  }
  if (length(campaign.coldOutreach.subjectLine) > EMAIL_SUBJECT_MAX) {
    found.push({
      id: 'email-subject-length',
      severity: 'warn',
      platform: 'email',
      message: { en: `The email subject is over ${EMAIL_SUBJECT_MAX} characters and gets cut off on phones.`, fa: `موضوع ایمیل بیشتر از ${EMAIL_SUBJECT_MAX} نویسه است و روی موبایل بریده می‌شود.` },
    });
  }
  return found;
}

function languageCheck(campaign: AdCampaign): readonly Check[] {
  const { hook, body, cta } = campaign.metaFeed;
  const share = persianShare([hook, body, cta].join(' '));
  if (campaign.language === 'fa' && share < PERSIAN_SHARE_EXPECTED_MIN) {
    return [{ id: 'language-mismatch', severity: 'warn', platform: 'general', message: { en: 'The campaign is set to Persian but the copy is mostly not Persian.', fa: 'زبان کمپین فارسی است ولی متن بیشتر فارسی نیست.' } }];
  }
  if (campaign.language === 'en' && share > PERSIAN_SHARE_UNEXPECTED_MAX) {
    return [{ id: 'language-mismatch', severity: 'warn', platform: 'general', message: { en: 'The campaign is set to English but much of the copy is Persian.', fa: 'زبان کمپین انگلیسی است ولی بخش زیادی از متن فارسی است.' } }];
  }
  return [];
}

function claimCheck(campaign: AdCampaign): readonly Check[] {
  const copy = [
    campaign.metaFeed.hook,
    campaign.metaFeed.body,
    ...campaign.metaFeed.bullets,
    campaign.reelsStory.hookSeconds,
    campaign.reelsStory.storyScript,
    campaign.reelsStory.overlayBadge,
    campaign.linkedinB2B.headline,
    campaign.linkedinB2B.problem,
    campaign.linkedinB2B.solution,
    ...campaign.linkedinB2B.proofPoints,
    campaign.googleSearch.description1,
    campaign.googleSearch.description2,
    campaign.coldOutreach.body,
  ].join(' ');
  const figures = [...new Set(copy.match(CLAIM) ?? [])].slice(0, MAX_CLAIMS_LISTED);
  if (figures.length === 0) return [];
  const list = figures.join(', ');
  return [
    {
      id: 'unsourced-claim',
      severity: 'warn',
      platform: 'general',
      message: {
        en: `The copy states figures (${list}). Publish only numbers you can show a source for.`,
        fa: `متن عددهایی دارد (${list}). فقط عددهایی را منتشر کنید که منبعشان را دارید.`,
      },
    },
  ];
}

function altChecks(campaign: AdCampaign): readonly Check[] {
  return IMAGE_KINDS.flatMap((kind): Check[] => {
    const alt = altOf(campaign, kind);
    if (alt === '') {
      return [{ id: `alt-missing-${kind}`, severity: 'warn', platform: 'images', message: { en: `The ${kind} image has no alt text.`, fa: `تصویر ${kind} متن جایگزین (alt) ندارد.` } }];
    }
    const found: Check[] = [];
    if (length(alt) > ALT_MAX) {
      found.push({ id: `alt-length-${kind}`, severity: 'warn', platform: 'images', message: { en: `The ${kind} image's alt text is over ${ALT_MAX} characters.`, fa: `متن alt تصویر ${kind} بیشتر از ${ALT_MAX} نویسه است.` } });
    }
    if (alt.toLowerCase() === campaign.brandName.trim().toLowerCase() || ALT_PREFIX.test(alt)) {
      found.push({
        id: `alt-quality-${kind}`,
        severity: 'info',
        platform: 'images',
        message: {
          en: `The ${kind} image's alt text only repeats the brand or starts with "image of"; describe what is in the picture.`,
          fa: `متن alt تصویر ${kind} فقط نام برند را تکرار می‌کند یا با «تصویر از» شروع می‌شود؛ آنچه در عکس است را توصیف کنید.`,
        },
      });
    }
    return found;
  });
}

export function checkCampaign(campaign: AdCampaign): readonly Check[] {
  return [
    ...googleChecks(campaign),
    ...metaChecks(campaign),
    ...otherCopyChecks(campaign),
    ...languageCheck(campaign),
    ...claimCheck(campaign),
    ...altChecks(campaign),
  ];
}
