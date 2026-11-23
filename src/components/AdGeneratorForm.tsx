import React from 'react';
import { 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Globe, 
  Target, 
  Sliders, 
  Check, 
  PhoneCall,
  Building,
  Image as ImageIcon
} from 'lucide-react';
import { AdCampaign } from '../types/ads';
import { AD_PRESETS } from '../data/adPresets';

interface AdGeneratorFormProps {
  campaign: AdCampaign;
  onChange: (updated: AdCampaign) => void;
  onApplyPreset: (presetId: string) => void;
  onGenerateVariations: () => void;
  lang: 'en' | 'fa';
}

export const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({
  campaign,
  onChange,
  onApplyPreset,
  onGenerateVariations,
  lang
}) => {
  const tones: AdCampaign['tone'][] = [
    'Urgent & High-Converting',
    'Executive & Trustworthy',
    'Relatable & Viral',
    'Bold & Disruptive'
  ];

  const availableImages = [
    { label: 'SMB Phone Receptionist (Marble Desk)', path: '/src/assets/images/ad_smb_receptionist_square_1794454357509.jpg' },
    { label: 'Executive Document Ingestion HUD', path: '/src/assets/images/ad_enterprise_invoice_square_1794454358889.jpg' },
    { label: 'Enterprise Glass Boardroom (16:9)', path: '/src/assets/images/ad_linkedin_enterprise_banner_1794454358791.jpg' },
    { label: 'Reels Phone Answering (Twilight 9:16)', path: '/src/assets/images/ad_reels_phone_answering_1794454357907.jpg' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl">
      
      {/* Preset Selector Banner */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'انتخاب الگوهای آماده تبلیغاتی' : 'Campaign Presets'}</span>
          </label>
          <span className="text-[11px] text-slate-400">1-Click Load</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {AD_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onApplyPreset(p.id)}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                campaign.id === p.campaign.id
                  ? 'bg-purple-950/40 border-purple-500 text-white shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold truncate">{lang === 'fa' ? p.labelFa : p.labelEn}</div>
              <div className="text-[10px] text-slate-500 truncate">{p.campaign.targetNiche}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Campaign Form */}
      <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
        
        {/* Brand Name & Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {lang === 'fa' ? 'نام برند یا محصول' : 'Brand / Business Name *'}
            </label>
            <input
              type="text"
              value={campaign.brandName}
              onChange={(e) => onChange({ ...campaign, brandName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. SunAI Systems"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {lang === 'fa' ? 'شعار یا گزاره ارزش اصلی' : 'Core Tagline / Value Proposition'}
            </label>
            <input
              type="text"
              value={campaign.tagline}
              onChange={(e) => onChange({ ...campaign, tagline: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. 24/7 AI Phone Receptionist & Instant Booking"
            />
          </div>
        </div>

        {/* Niche & Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {lang === 'fa' ? 'نیچ و حوزه فعالیت' : 'Target Niche / Industry'}
            </label>
            <input
              type="text"
              value={campaign.targetNiche}
              onChange={(e) => onChange({ ...campaign, targetNiche: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. Local Clinics, Contractors, Supply Chain"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {lang === 'fa' ? 'مخاطب هدف و منطقه' : 'Audience Persona & Region'}
            </label>
            <input
              type="text"
              value={campaign.targetAudience}
              onChange={(e) => onChange({ ...campaign, targetAudience: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs"
              placeholder="e.g. Clinic Owners, CFOs in Canada & US"
            />
          </div>
        </div>

        {/* Irresistible Offer / Lead Magnet */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            {lang === 'fa' ? 'پیشنهاد رد‌نشدنی / قلاب جذب مشتری (Offer Hook)' : 'Core Offer / Lead Magnet Hook *'}
          </label>
          <input
            type="text"
            value={campaign.offer}
            onChange={(e) => onChange({ ...campaign, offer: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs font-medium text-amber-300"
            placeholder="e.g. 60-Second Live AI Phone Call Test OR Free 14-Day Pilot"
          />
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            {lang === 'fa' ? 'لحن و سبک آگهی (Tone of Voice)' : 'Tone of Voice & Copywriting Angle'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ ...campaign, tone: t })}
                className={`px-3 py-2 rounded-lg border text-[11px] font-medium transition-all ${
                  campaign.tone === t
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Creative Selector */}
        <div>
          <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
            <span>{lang === 'fa' ? 'انتخاب تصویر ۴K شاخص برای ماک‌آپ' : 'Select 4K Creative Visual'}</span>
            <span className="text-[10px] text-slate-500">Ultra-High Res</span>
          </label>
          <select
            value={campaign.squareImage}
            onChange={(e) => onChange({ ...campaign, squareImage: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 text-xs"
          >
            {availableImages.map((img, i) => (
              <option key={i} value={img.path}>{img.label}</option>
            ))}
          </select>
        </div>

        {/* Action Button: AI Polish & Variations */}
        <div className="pt-2">
          <button
            onClick={onGenerateVariations}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{lang === 'fa' ? 'تولید دوباره سناریوها و هوک‌های جذاب با هوش مصنوعی' : 'Polish & Regenerate High-Converting Variations'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
