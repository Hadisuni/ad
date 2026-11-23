import { z } from 'zod';

/**
 * What a campaign sent to POST /api/campaigns must look like. It mirrors AdCampaign in src/types/ads.ts; the limits
 * keep one stored campaign small, and the image rule keeps anything but https pictures and the app's own pictures out
 * of the <img> tags the preview renders.
 */

const SHORT_MAX = 300;
const LONG_MAX = 3000;
const LIST_MAX = 12;

const short = z.string().trim().min(1).max(SHORT_MAX);
const long = z.string().trim().min(1).max(LONG_MAX);

const HTTPS_IMAGE = /^https:\/\/[^\s]+$/;
const OWN_IMAGE = /^\/(src\/assets\/)?images\/[A-Za-z0-9_-][A-Za-z0-9._-]*$/;

const image = z
  .string()
  .trim()
  .max(1000)
  .refine((value) => HTTPS_IMAGE.test(value) || (OWN_IMAGE.test(value) && !value.includes('..')), {
    message: 'must be an https address or an /images/<file> path',
  });

// Well over the 125 a good alt text needs, so the checker can still say "too long" instead of the request failing.
const altText = z.string().trim().max(300).optional();

export const TONES = ['Urgent & High-Converting', 'Executive & Trustworthy', 'Relatable & Viral', 'Bold & Disruptive'] as const;

export const campaignInputSchema = z.object({
  id: z.string().max(100).optional(),
  brandName: short,
  tagline: short,
  targetNiche: short,
  targetAudience: short,
  region: short,
  offer: short,
  tone: z.enum(TONES),
  language: z.enum(['en', 'fa']),
  squareImage: image,
  verticalImage: image,
  landscapeImage: image,
  squareImageAlt: altText,
  verticalImageAlt: altText,
  landscapeImageAlt: altText,
  metaFeed: z.object({
    hook: short,
    body: long,
    bullets: z.array(short).min(1).max(LIST_MAX),
    cta: short,
    hashtags: z.array(short).max(30),
  }),
  reelsStory: z.object({
    hookSeconds: short,
    storyScript: long,
    overlayBadge: short,
    audioSuggestion: short,
    ctaAction: short,
  }),
  linkedinB2B: z.object({
    headline: short,
    problem: long,
    solution: long,
    proofPoints: z.array(short).min(1).max(LIST_MAX),
    ctaButton: short,
  }),
  googleSearch: z.object({
    headline1: short,
    headline2: short,
    headline3: short,
    description1: short,
    description2: short,
    displayPath: short,
    sitelinks: z.array(z.object({ title: short, desc: short })).max(LIST_MAX),
  }),
  coldOutreach: z.object({
    subjectLine: short,
    openingLine: long,
    body: long,
    callToAction: long,
  }),
});

export type CampaignInput = z.infer<typeof campaignInputSchema>;

export type CampaignParse = { readonly ok: true; readonly campaign: CampaignInput } | { readonly ok: false; readonly error: string };

/** The first few problems as one line a caller (n8n's error output, a person) can read: "tone: Invalid option; metaFeed.hook: ...". */
export function parseCampaign(input: unknown): CampaignParse {
  const result = campaignInputSchema.safeParse(input);
  if (result.success) return { ok: true, campaign: result.data };
  const lines = result.error.issues.slice(0, 5).map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`);
  return { ok: false, error: lines.join('; ') };
}
