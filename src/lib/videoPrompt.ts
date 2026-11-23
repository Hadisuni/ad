import type { AdCampaign } from '../types/ads.ts';

/**
 * Turns a campaign's Reels story into a request for a short vertical video. The model draws pictures well and spells
 * badly, so the prompt asks for no on-screen text or logos: the badge, the call to action and the brand are added in the
 * edit or by the platform, not by the model.
 */

export interface VideoRequest {
  readonly prompt: string;
  readonly negativePrompt: string;
  readonly aspectRatio: '9:16';
  readonly durationSeconds: 8;
}

const STORY_MAX_CHARS = 600;

const LOOK_BY_TONE: Record<AdCampaign['tone'], string> = {
  'Urgent & High-Converting': 'brisk pacing, tense and purposeful, quick but smooth camera moves, warm light against cool shadows',
  'Executive & Trustworthy': 'calm and premium, steady slow camera, soft natural light, refined and uncluttered',
  'Relatable & Viral': 'handheld and intimate, warm natural light, everyday and human, quick relatable moments',
  'Bold & Disruptive': 'high contrast and dynamic, confident camera moves, strong colour, a striking opening frame',
};

const NEGATIVE_PROMPT = 'text, captions, subtitles, watermark, logo, brand names, distorted hands, extra fingers, blurry faces';

const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`);

export function buildVideoRequest(campaign: AdCampaign): VideoRequest {
  const { hookSeconds, storyScript } = campaign.reelsStory;
  const prompt = [
    `A vertical 9:16 cinematic social media video ad for ${campaign.targetNiche}, aimed at ${campaign.targetAudience}.`,
    `Opening moment: ${hookSeconds}`,
    `Story: ${clip(storyScript, STORY_MAX_CHARS)}`,
    `Look and feel: ${LOOK_BY_TONE[campaign.tone]}. Realistic, natural, shallow depth of field.`,
    'No on-screen text, no captions, no logos. End on a calm, reassuring moment.',
  ].join(' ');
  return { prompt, negativePrompt: NEGATIVE_PROMPT, aspectRatio: '9:16', durationSeconds: 8 };
}
