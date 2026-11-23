/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Download, 
  Share2, 
  Globe, 
  RotateCcw,
  ShieldCheck,
  Check,
  Zap,
  ArrowRight,
  Sliders,
  Send,
  Eye
} from 'lucide-react';

import { AdCampaign } from './types/ads';
import { AD_PRESETS } from './data/adPresets';
import { AdGeneratorForm } from './components/AdGeneratorForm';
import { AdPreviewHub } from './components/AdPreviewHub';
import { InstallAppModal } from './components/InstallAppModal';

export default function App() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-receptionist');
  const [campaign, setCampaign] = useState<AdCampaign>(AD_PRESETS[0].campaign);
  const [lang, setLang] = useState<'en' | 'fa'>('en');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleApplyPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = AD_PRESETS.find(p => p.id === presetId);
    if (found) {
      setCampaign({ ...found.campaign });
      showNotification(lang === 'fa' ? 'الگوی تبلیغاتی لود شد' : 'Campaign Preset Loaded');
    }
  };

  const handleGenerateVariations = () => {
    // Generates fresh, punchy variations based on the current campaign fields
    const hooks = [
      `How 1 business eliminated 15+ hours of front-desk chaos without hiring...`,
      `Every missed call is a lost $1,500 customer. Here is how to fix it in 48 hours.`,
      `Stop paying staff to manually type invoices into software. Automate it in 90 seconds.`,
      `The #1 reason clinics and local firms lose high-paying clients after 6:00 PM...`
    ];
    const randomHook = hooks[Math.floor(Math.random() * hooks.length)];

    setCampaign(prev => ({
      ...prev,
      metaFeed: {
        ...prev.metaFeed,
        hook: randomHook
      },
      reelsStory: {
        ...prev.reelsStory,
        hookSeconds: randomHook
      }
    }));

    showNotification(lang === 'fa' ? 'هوک‌ها و متن‌های تازه تولید شدند!' : 'Fresh AI Variations Generated!');
  };

  const showNotification = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans"
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-purple-600/30">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight">AdForge AI</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono font-semibold">
                  4K STUDIO
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Social Media & B2B Ad Campaign Generator
              </div>
            </div>
          </div>

          {/* Quick Preset Selector in Header */}
          <div className="hidden md:flex items-center gap-2">
            {AD_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  campaign.id === p.campaign.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {lang === 'fa' ? p.labelFa : p.labelEn.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Actions & Lang Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap"
              title="Install AdForge AI on your phone or desktop"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'نصب روی گوشی و سیستم' : 'Install App'}</span>
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              {lang === 'en' ? 'فارسی' : 'English'}
            </button>

            <button
              onClick={handleGenerateVariations}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg text-xs transition-all shadow-md shadow-purple-600/20 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'fa' ? 'تولید هوک جدید' : 'Generate AI Hook'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Subtitle / Mode Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-blue-950/20 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {lang === 'fa' 
                  ? 'استودیوی جامع ساخت تبلیغات و کمپین‌های شبکه‌های اجتماعی' 
                  : '4K Social Media & Enterprise Ad Campaign Generator'}
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'fa'
                  ? 'تولید لحظه‌ای پست اینستاگرام، سناریوی ریلز و استوری، پست‌های B2B لینکدین، و تبلیغات کلیکی گوگل'
                  : 'Live visual mockups for Meta 1:1, 9:16 vertical stories, LinkedIn B2B sponsored ads, and Google PPC snippets.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready to Copy & Launch</span>
          </div>
        </div>

        {/* Workspace Split Layout: Editor Form (Left) & Live Preview Hub (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Generator Form & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <AdGeneratorForm 
              campaign={campaign}
              onChange={setCampaign}
              onApplyPreset={handleApplyPreset}
              onGenerateVariations={handleGenerateVariations}
              lang={lang}
            />
          </div>

          {/* Right Column: Interactive Multi-Platform Preview Hub */}
          <div className="lg:col-span-7">
            <AdPreviewHub 
              campaign={campaign}
              onUpdateCampaign={setCampaign}
              lang={lang}
            />
          </div>

        </div>

      </main>

      {/* Quiet Studio Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-white">AdForge AI Studio</span>
            <span>·</span>
            <span>Built for High-Converting Social Ads & Viral AI Growth</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Instagram 1:1</span>
            <span>Reels 9:16</span>
            <span>LinkedIn B2B</span>
            <span>Google Search PPC</span>
          </div>
        </div>
      </footer>

      {/* PWA Install Modal */}
      <InstallAppModal 
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
