import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Share2, 
  Monitor, 
  Apple, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'fa';
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose, lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-600/30">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {lang === 'fa' ? 'نصب اپلیکیشن روی گوشی و کامپیوتر' : 'Install AdForge AI on Phone & Desktop'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'fa' ? 'دسترسی همیشگی مانند یک اپلیکیشن بومی بدون نیاز به App Store' : 'Instant 1-click access anytime without App Store friction'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs">
          
          {/* Quick Direct Action if browser supports beforeinstallprompt */}
          {isInstallable && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/50 to-blue-950/40 border border-purple-500/30 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-sm">
                  {lang === 'fa' ? 'نصب فوری با ۱ کلیک' : 'Ready to Install with 1 Click'}
                </div>
                <div className="text-[11px] text-slate-300">
                  {lang === 'fa' ? 'افزودن مستقیم به صفحه اصلی گوشی یا دسکتاپ' : 'Add directly to your home screen or desktop application dock'}
                </div>
              </div>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg text-xs transition-colors shadow-lg shadow-purple-600/30 shrink-0 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'نصب برنامه' : 'Install Now'}</span>
              </button>
            </div>
          )}

          {/* Three Guides: iPhone, Android, and PC/Mac */}
          <div className="space-y-4">
            
            {/* Guide 1: iPhone / iOS Safari */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Apple className="w-4 h-4 text-slate-200" />
                <span>{lang === 'fa' ? 'راهنمای آیفون و آیپد (iOS Safari):' : 'On iPhone / iPad (Safari):'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed text-[11px]">
                <li>
                  {lang === 'fa' ? 'لینک زیر را در مرورگر Safari آیفون باز کنید.' : 'Open this link in your iPhone Safari browser.'}
                </li>
                <li>
                  {lang === 'fa' ? 'دکمه اشتراک‌گذاری (Share Icon 📤 در پایین صفحه) را بزنید.' : 'Tap the Share icon (box with upward arrow) at the bottom.'}
                </li>
                <li>
                  {lang === 'fa' ? 'کمی به پایین اسکرول کنید و گزینه «Add to Home Screen» (افزودن به صفحه اصلی) را انتخاب کنید.' : 'Scroll down and tap "Add to Home Screen" (افزودن به صفحه اصلی).'}
                </li>
              </ol>
            </div>

            {/* Guide 2: Android (Chrome / Samsung) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'fa' ? 'راهنمای گوشی‌های اندروید (Chrome):' : 'On Android (Chrome / Samsung):'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed text-[11px]">
                <li>
                  {lang === 'fa' ? 'روی سه نقطه (⋮) در گوشه بالای مرورگر Chrome بزنید.' : 'Tap the three dots (⋮) in the top-right corner of Chrome.'}
                </li>
                <li>
                  {lang === 'fa' ? 'گزینه «Install app» یا «Add to Home Screen» را بزنید تا آیکون روی صفحه اصلی گوشی اضافه شود.' : 'Tap "Install app" or "Add to Home screen" to save it as an app.'}
                </li>
              </ol>
            </div>

            {/* Guide 3: PC / Mac Desktop */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Monitor className="w-4 h-4 text-sky-400" />
                <span>{lang === 'fa' ? 'راهنمای کامپیوتر (ویندوز / مک):' : 'On PC / Mac Desktop (Chrome or Edge):'}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'fa'
                  ? 'در نوار آدرس مرورگر (سمت راست)، روی آیکون مانیتور کوچک یا دکمه «Install AdForge AI» کلیک کنید تا مثل یک نرم‌افزار دسکتاپ مستقل با پنجره اختصاصی باز شود.'
                  : 'In your browser address bar (top right), click the computer/install icon to install AdForge AI as a standalone desktop app.'}
              </p>
            </div>

          </div>

          {/* Copyable Web App Link */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-slate-500 block text-[10px] font-mono">APP URL (Open on your phone):</span>
              <span className="font-mono text-purple-400 text-xs truncate block">{currentUrl}</span>
            </div>
            <button
              onClick={copyUrl}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>PWA Certified · Works Offline & Launches in Standalone Mode</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            {lang === 'fa' ? 'بستن پنجره' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
};
