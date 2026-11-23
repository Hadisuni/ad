import React from 'react';
import { ShieldAlert, Sparkles, Globe, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCriticDrawer: () => void;
  onOpenDemoModal: () => void;
  onOpenAdsHub: () => void;
  lang: 'en' | 'fa';
  setLang: (l: 'en' | 'fa') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCriticDrawer, 
  onOpenDemoModal,
  onOpenAdsHub,
  lang,
  setLang
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <a 
          href="/" 
          className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/30">
            S
          </div>
          <span>SunAI Systems</span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#capabilities" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'fa' ? 'قابلیت‌ها' : 'Capabilities'}
          </a>
          <a href="#pipeline-demo" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'fa' ? 'شبیه‌ساز زنده' : 'Pipeline Demo'}
          </a>
          <a href="#case-studies" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'fa' ? 'مطالعات موردی' : 'Case Studies'}
          </a>
          <a href="#roi-calculator" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'fa' ? 'محاسبه بازگشت سرمایه' : 'ROI Calculator'}
          </a>
          <a href="#security-trust" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            {lang === 'fa' ? 'امنیت و انطباق' : 'Security & Trust'}
          </a>
        </nav>

        {/* Zone 3: Primary Action + Critic Suite + Ads Studio trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* 4K Ads Studio Button */}
          <button
            onClick={onOpenAdsHub}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all whitespace-nowrap shrink-0"
            title="Open 4K Social Media Ads & Campaign Creative Hub"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'fa' ? 'استودیو تبلیغات ۴K' : 'Ads Studio 4K'}</span>
          </button>

          {/* Critic & Audit Suite Button */}
          <button
            onClick={onOpenCriticDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all whitespace-nowrap shrink-0"
            title="Open Critic Audit & SEO Growth Strategy"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'fa' ? 'تحلیل منتقد و سئو' : 'Critic & SEO'}</span>
          </button>

          {/* Lang switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'en' ? 'فارسی' : 'EN'}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenDemoModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20 whitespace-nowrap shrink-0"
          >
            {lang === 'fa' ? 'شروع پایلوت سازمانی' : 'Start Enterprise Pilot'}
          </button>
        </div>

      </div>
    </header>
  );
};
