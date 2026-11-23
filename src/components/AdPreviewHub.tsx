import React, { useState } from 'react';
import { imageAlt } from '../lib/adChecks';
import { 
  Instagram, 
  Smartphone, 
  Linkedin, 
  Search, 
  Mail, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare, 
  Repeat, 
  PhoneCall, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { AdCampaign } from '../types/ads';

interface AdPreviewHubProps {
  campaign: AdCampaign;
  onUpdateCampaign: (updated: AdCampaign) => void;
  lang: 'en' | 'fa';
}

export const AdPreviewHub: React.FC<AdPreviewHubProps> = ({
  campaign,
  onUpdateCampaign,
  lang
}) => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'reels' | 'linkedin' | 'google' | 'cold-email' | 'lead-magnet'>('instagram');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Simulated Phone Test Lead Magnet State
  const [simulatedPhone, setSimulatedPhone] = useState('+1 (604) 555-0192');
  const [phoneCountdown, setPhoneCountdown] = useState<number | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleStartPhoneDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneCountdown(60);
    const interval = setInterval(() => {
      setPhoneCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const downloadFullPackMarkdown = () => {
    const md = `# ${campaign.brandName} - Complete Ad Campaign Pack
**Tagline:** ${campaign.tagline}
**Niche:** ${campaign.targetNiche}
**Target Audience:** ${campaign.targetAudience} (${campaign.region})
**Core Offer:** ${campaign.offer}
**Tone:** ${campaign.tone}

---

## 1. Instagram & Meta Feed Ad (1:1)
**Hook:**
${campaign.metaFeed.hook}

**Body:**
${campaign.metaFeed.body}

**Key Bullets:**
${campaign.metaFeed.bullets.map(b => `- ${b}`).join('\n')}

**Call to Action:**
${campaign.metaFeed.cta}

**Hashtags:**
${campaign.metaFeed.hashtags.join(' ')}

---

## 2. Instagram Reels / TikTok Script (9:16)
**3-Second Hook:** ${campaign.reelsStory.hookSeconds}
**Script:** ${campaign.reelsStory.storyScript}
**On-Screen Badge:** ${campaign.reelsStory.overlayBadge}
**Audio Suggestion:** ${campaign.reelsStory.audioSuggestion}
**CTA:** ${campaign.reelsStory.ctaAction}

---

## 3. LinkedIn B2B Sponsored Ad
**Headline:** ${campaign.linkedinB2B.headline}
**Problem:** ${campaign.linkedinB2B.problem}
**Solution:** ${campaign.linkedinB2B.solution}
**Proof Points:**
${campaign.linkedinB2B.proofPoints.map(p => `- ${p}`).join('\n')}
**CTA Button:** ${campaign.linkedinB2B.ctaButton}

---

## 4. Google Search Ads (PPC)
**Headlines:**
- ${campaign.googleSearch.headline1}
- ${campaign.googleSearch.headline2}
- ${campaign.googleSearch.headline3}

**Descriptions:**
- ${campaign.googleSearch.description1}
- ${campaign.googleSearch.description2}

**Display URL:** ${campaign.googleSearch.displayPath}

**Sitelinks:**
${campaign.googleSearch.sitelinks.map(s => `- **${s.title}**: ${s.desc}`).join('\n')}

---

## 5. Cold Outreach Email / DM
**Subject:** ${campaign.coldOutreach.subjectLine}
**Opening:** ${campaign.coldOutreach.openingLine}
**Body:** ${campaign.coldOutreach.body}
**CTA:** ${campaign.coldOutreach.callToAction}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${campaign.brandName.toLowerCase().replace(/\s+/g, '_')}_ad_campaign_pack.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      
      {/* Platform Navigation Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActivePlatform('instagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'instagram' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Meta Feed (1:1)</span>
          </button>

          <button
            onClick={() => setActivePlatform('reels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'reels' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Reels Story (9:16)</span>
          </button>

          <button
            onClick={() => setActivePlatform('linkedin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'linkedin' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn B2B</span>
          </button>

          <button
            onClick={() => setActivePlatform('google')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'google' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Google PPC</span>
          </button>

          <button
            onClick={() => setActivePlatform('cold-email')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'cold-email' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cold Email & DM</span>
          </button>

          <button
            onClick={() => setActivePlatform('lead-magnet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activePlatform === 'lead-magnet' ? 'bg-amber-600 text-white' : 'text-amber-400 bg-amber-500/10'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Viral Hook Simulator</span>
          </button>
        </div>

        {/* Download Campaign Pack Button */}
        <button
          onClick={downloadFullPackMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === 'fa' ? 'دانلود کل پکیج (.md)' : 'Export Full Pack (.md)'}</span>
        </button>
      </div>

      {/* Main Preview Work Area */}
      <div className="p-6 overflow-y-auto max-h-[720px] space-y-6">
        
        {/* PLATFORM 1: Instagram / Meta Feed */}
        {activePlatform === 'instagram' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Instagram Mockup */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-3.5 flex items-center justify-between border-b border-slate-800 bg-slate-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                    {campaign.brandName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{campaign.brandName.toLowerCase().replace(/\s+/g, '')}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <div className="text-[10px] text-slate-400">Sponsored · {campaign.targetNiche}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-xs font-bold">•••</div>
              </div>

              <div className="aspect-square bg-slate-900 relative group overflow-hidden">
                <img
                  src={campaign.squareImage}
                  alt={imageAlt(campaign, 'square')}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur rounded-lg border border-slate-700/60 text-[10px] font-mono text-emerald-400">
                  4K High-Res Visual Creative
                </div>
              </div>

              <div className="p-4 space-y-2.5 bg-slate-950">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 text-rose-500 cursor-pointer fill-rose-500" />
                    <MessageCircle className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                    <Send className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 hover:text-amber-400 cursor-pointer" />
                </div>
                <div className="text-xs font-semibold text-white">1,248 likes</div>
                
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong className="text-white mr-1">{campaign.brandName.toLowerCase().replace(/\s+/g, '')}</strong> {campaign.metaFeed.hook}</div>
                  <div className="text-slate-400 line-clamp-2">{campaign.metaFeed.body}</div>
                </div>

                <div className="text-[11px] text-blue-400 font-mono">
                  {campaign.metaFeed.hashtags.join(' ')}
                </div>
              </div>
            </div>

            {/* Editable & Copyable Panel */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Instagram / Meta Caption & Hashtags</h4>
                <button
                  onClick={() => copyToClipboard(
                    `${campaign.metaFeed.hook}\n\n${campaign.metaFeed.body}\n\n${campaign.metaFeed.bullets.map(b => `• ${b}`).join('\n')}\n\n👉 ${campaign.metaFeed.cta}\n\n${campaign.metaFeed.hashtags.join(' ')}`,
                    'ig-caption'
                  )}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {copiedKey === 'ig-caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'ig-caption' ? 'Copied!' : 'Copy Entire Post'}</span>
                </button>
              </div>

              {/* Editable Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Headline Hook</label>
                  <input
                    type="text"
                    value={campaign.metaFeed.hook}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      metaFeed: { ...campaign.metaFeed, hook: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Body Copy</label>
                  <textarea
                    rows={4}
                    value={campaign.metaFeed.body}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      metaFeed: { ...campaign.metaFeed, body: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Call to Action (CTA)</label>
                  <input
                    type="text"
                    value={campaign.metaFeed.cta}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      metaFeed: { ...campaign.metaFeed, cta: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-300 font-semibold"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PLATFORM 2: Reels / Story 9:16 Vertical */}
        {activePlatform === 'reels' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 9:16 Mobile Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[280px] rounded-[36px] p-3 bg-slate-800 border-4 border-slate-700 shadow-2xl relative">
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
                
                <div className="rounded-[24px] overflow-hidden aspect-[9/16] relative bg-slate-950">
                  <img 
                    src={campaign.verticalImage}
                    alt={imageAlt(campaign, 'vertical')}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/40 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-white text-[11px]">
                      <span className="font-bold">{campaign.brandName} · Sponsored</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Reels</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-slate-900/90 backdrop-blur border border-amber-500/40 text-[11px] text-amber-200 shadow-lg">
                        {campaign.reelsStory.overlayBadge}
                      </div>

                      <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-center text-xs font-bold shadow-xl">
                        {campaign.reelsStory.ctaAction}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* Video Script & Scene Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Video Script & Scene Breakdown</h4>
                <button
                  onClick={() => copyToClipboard(
                    `HOOK (First 3s): ${campaign.reelsStory.hookSeconds}\n\nSCENARIO SCRIPT:\n${campaign.reelsStory.storyScript}\n\nON-SCREEN OVERLAY: ${campaign.reelsStory.overlayBadge}\nAUDIO: ${campaign.reelsStory.audioSuggestion}\nCTA: ${campaign.reelsStory.ctaAction}`,
                    'reels-script'
                  )}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {copiedKey === 'reels-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'reels-script' ? 'Copied!' : 'Copy Video Script'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-purple-400 font-mono text-[10px] uppercase block mb-1">0:00 - 0:03 (Pattern Interrupt Hook)</span>
                  <div className="text-white font-semibold text-sm">{campaign.reelsStory.hookSeconds}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-blue-400 font-mono text-[10px] uppercase block mb-1">0:03 - 0:25 (Voiceover Narrative)</span>
                  <div className="text-slate-300 leading-relaxed">{campaign.reelsStory.storyScript}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase block">Audio Track</span>
                    <strong className="text-white text-xs">{campaign.reelsStory.audioSuggestion}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase block">Call to Action</span>
                    <strong className="text-emerald-400 text-xs">{campaign.reelsStory.ctaAction}</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PLATFORM 3: LinkedIn B2B Sponsored Ad */}
        {activePlatform === 'linkedin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LinkedIn Card Mockup */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {campaign.brandName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{campaign.brandName}</span>
                      <span className="text-slate-500">· 1st</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{campaign.tagline} · Promoted</div>
                  </div>
                </div>
                <span className="text-xs text-blue-400 font-semibold cursor-pointer">+ Follow</span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <p className="font-semibold text-white mb-2">{campaign.linkedinB2B.headline}</p>
                <p className="text-slate-400 mb-2">{campaign.linkedinB2B.problem}</p>
                <p className="text-slate-300">{campaign.linkedinB2B.solution}</p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] relative">
                <img
                  src={campaign.landscapeImage}
                  alt={imageAlt(campaign, 'landscape')}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">sunaisystems.com</div>
                  <div className="text-xs font-bold text-white">{campaign.tagline}</div>
                </div>
                <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                  {campaign.linkedinB2B.ctaButton}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><ThumbsUp className="w-4 h-4" /> Like</span>
                <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><MessageSquare className="w-4 h-4" /> Comment</span>
                <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><Repeat className="w-4 h-4" /> Repost</span>
              </div>
            </div>

            {/* LinkedIn Copy Kit */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">LinkedIn B2B Sponsored Ad Copy</h4>
                <button
                  onClick={() => copyToClipboard(
                    `${campaign.linkedinB2B.headline}\n\n${campaign.linkedinB2B.problem}\n\n${campaign.linkedinB2B.solution}\n\nKey Proof Points:\n${campaign.linkedinB2B.proofPoints.map(p => `• ${p}`).join('\n')}\n\nCTA: ${campaign.linkedinB2B.ctaButton}`,
                    'li-copy'
                  )}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {copiedKey === 'li-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'li-copy' ? 'Copied!' : 'Copy LinkedIn Post'}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Executive Headline</label>
                  <input
                    type="text"
                    value={campaign.linkedinB2B.headline}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      linkedinB2B: { ...campaign.linkedinB2B, headline: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Problem & Frustration</label>
                  <textarea
                    rows={2}
                    value={campaign.linkedinB2B.problem}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      linkedinB2B: { ...campaign.linkedinB2B, problem: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Engineered Solution</label>
                  <textarea
                    rows={3}
                    value={campaign.linkedinB2B.solution}
                    onChange={(e) => onUpdateCampaign({
                      ...campaign,
                      linkedinB2B: { ...campaign.linkedinB2B, solution: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PLATFORM 4: Google PPC Search */}
        {activePlatform === 'google' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Google Search Sponsored Snippet Preview</h4>
              <button
                onClick={() => copyToClipboard(
                  `HEADLINES:\n1. ${campaign.googleSearch.headline1}\n2. ${campaign.googleSearch.headline2}\n3. ${campaign.googleSearch.headline3}\n\nDESCRIPTIONS:\n1. ${campaign.googleSearch.description1}\n2. ${campaign.googleSearch.description2}\n\nURL: ${campaign.googleSearch.displayPath}`,
                  'google-ppc'
                )}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedKey === 'google-ppc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'google-ppc' ? 'Copied!' : 'Copy PPC Campaign'}</span>
              </button>
            </div>

            {/* Google SERP Card */}
            <div className="p-6 rounded-2xl bg-white text-slate-900 space-y-3 font-sans shadow-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="font-bold text-slate-900">Sponsored</span>
                <span>·</span>
                <span>https://{campaign.googleSearch.displayPath}</span>
              </div>

              <h3 className="text-lg font-semibold text-blue-800 hover:underline cursor-pointer">
                {campaign.googleSearch.headline1} | {campaign.googleSearch.headline2} | {campaign.googleSearch.headline3}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed">
                {campaign.googleSearch.description1} {campaign.googleSearch.description2}
              </p>

              {/* Sitelinks */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 text-xs text-blue-800">
                {campaign.googleSearch.sitelinks.map((s, idx) => (
                  <div key={idx}>
                    <div className="font-bold hover:underline cursor-pointer">{s.title}</div>
                    <div className="text-[11px] text-slate-500">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PLATFORM 5: Cold Email & DM */}
        {activePlatform === 'cold-email' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">High-Response Cold Email / LinkedIn DM Template</h4>
              <button
                onClick={() => copyToClipboard(
                  `Subject: ${campaign.coldOutreach.subjectLine}\n\n${campaign.coldOutreach.openingLine}\n\n${campaign.coldOutreach.body}\n\n${campaign.coldOutreach.callToAction}`,
                  'cold-email'
                )}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedKey === 'cold-email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cold-email' ? 'Copied!' : 'Copy Cold Email'}</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
              <div className="pb-3 border-b border-slate-800 flex items-center gap-2">
                <span className="text-slate-500">Subject:</span>
                <span className="text-amber-300 font-bold">{campaign.coldOutreach.subjectLine}</span>
              </div>

              <div className="space-y-3 leading-relaxed">
                <p className="text-slate-400">{campaign.coldOutreach.openingLine}</p>
                <p className="text-slate-200">{campaign.coldOutreach.body}</p>
                <p className="text-blue-400 font-semibold">{campaign.coldOutreach.callToAction}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-sans">
                💡 Tip: Personalize the {"{{company_name}}"} and {"{{first_name}}"} variables. Send on Tuesday morning for highest open rates.
              </div>
            </div>
          </div>
        )}

        {/* PLATFORM 6: Viral Lead Magnet Simulator */}
        {activePlatform === 'lead-magnet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Hook 1: 60s Live Phone Call */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase">
                <PhoneCall className="w-4 h-4" />
                <span>SMB Viral Hook</span>
              </div>

              <h3 className="text-lg font-bold text-white">The 60-Second Live AI Phone Call Test</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience the exact viral lead magnet used by top AI voice startups. Prospective clients enter their phone number and receive an automated test call in 60 seconds demonstrating natural human speech.
              </p>

              {phoneCountdown !== null && phoneCountdown > 0 ? (
                <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                  <div className="text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
                    {phoneCountdown}s
                  </div>
                  <div className="text-xs text-white font-semibold">
                    Simulating AI Call to {simulatedPhone}...
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Natural voice synthesizer connecting to mobile gateway.
                  </div>
                </div>
              ) : phoneCountdown === 0 ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="text-xs font-bold text-emerald-400">Call Connected Successfully!</div>
                  <div className="text-[11px] text-slate-300">
                    Lead converted & qualified into CRM pipeline.
                  </div>
                  <button
                    onClick={() => setPhoneCountdown(null)}
                    className="mt-2 px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded"
                  >
                    Reset Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleStartPhoneDemo} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Target Phone Number</label>
                    <input
                      type="tel"
                      value={simulatedPhone}
                      onChange={(e) => setSimulatedPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-600/20"
                  >
                    Test 60-Second Call Simulator
                  </button>
                </form>
              )}
            </div>

            {/* Hook 2: Free 5-Document Audit */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase">
                <FileText className="w-4 h-4" />
                <span>Enterprise Viral Hook</span>
              </div>

              <h3 className="text-lg font-bold text-white">Free 5-Document Invariant & Health Check</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The enterprise hook modeled after DataAnnotation. High-volume teams upload 5 sample invoices, NDAs, or shipping bills to get an automated audit report showing discrepancies and time saved.
              </p>

              <div className="p-6 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center space-y-2">
                <FileText className="w-8 h-8 text-blue-400 mx-auto" />
                <div className="text-xs font-semibold text-white">Drop 5 Sample Invoices or NDAs Here</div>
                <div className="text-[11px] text-slate-400">PDF, TIFF, or Scanned Images (Up to 25MB)</div>
                <div className="text-[11px] text-emerald-400 font-mono pt-1">
                  🔒 Zero-Retention Model Privacy Guarantee
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
