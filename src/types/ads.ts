export interface AdCampaign {
  id: string;
  brandName: string;
  tagline: string;
  targetNiche: string;
  targetAudience: string;
  region: string;
  offer: string;
  tone: 'Urgent & High-Converting' | 'Executive & Trustworthy' | 'Relatable & Viral' | 'Bold & Disruptive';
  language: 'en' | 'fa';
  
  // Media Assets
  squareImage: string;
  verticalImage: string;
  landscapeImage: string;

  // Platform Specific Copies
  metaFeed: {
    hook: string;
    body: string;
    bullets: string[];
    cta: string;
    hashtags: string[];
  };
  reelsStory: {
    hookSeconds: string;
    storyScript: string;
    overlayBadge: string;
    audioSuggestion: string;
    ctaAction: string;
  };
  linkedinB2B: {
    headline: string;
    problem: string;
    solution: string;
    proofPoints: string[];
    ctaButton: string;
  };
  googleSearch: {
    headline1: string;
    headline2: string;
    headline3: string;
    description1: string;
    description2: string;
    displayPath: string;
    sitelinks: { title: string; desc: string }[];
  };
  coldOutreach: {
    subjectLine: string;
    openingLine: string;
    body: string;
    callToAction: string;
  };
}

export interface AdPreset {
  id: string;
  labelEn: string;
  labelFa: string;
  campaign: AdCampaign;
}
