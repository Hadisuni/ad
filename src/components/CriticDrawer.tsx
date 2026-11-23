import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Building2, 
  FileCode, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  CRITIC_FLAWS_AND_FIXES, 
  SEO_KEYWORD_STRATEGY, 
  INCORPORATION_ROADMAP 
} from '../data/criticReport';

interface CriticDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'fa';
  setLang: (l: 'en' | 'fa') => void;
}

export const CriticDrawer: React.FC<CriticDrawerProps> = ({ isOpen, onClose, lang, setLang }) => {
  const [activeTab, setActiveTab] = useState<'critic' | 'seo' | 'incorporation' | 'code'>('critic');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const schemaJsonLd = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sunaisystems.com/#organization",
      "name": "SunAI Systems",
      "url": "https://sunaisystems.com",
      "logo": "https://sunaisystems.com/logo.svg",
      "description": "Enterprise AI platform automating business document management workflows, contract audits, and ERP data ingestion.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contact@sunaisystems.com"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sunaisystems.com/#software",
      "name": "SunAI Document Intelligence Engine",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Cloud, REST API, Hybrid On-Prem",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Enterprise 14-day zero-risk Proof of Concept"
      }
    }
  ]
}`;

  const robotsTxt = `# robots.txt for sunaisystems.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/drafts/

Sitemap: https://sunaisystems.com/sitemap.xml`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl text-slate-100"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {lang === 'fa' ? 'مرکز تحلیل انتقادی، ارزیابی سئو و نقشه راه ثبت شرکت' : 'Executive Critic Audit & SEO Growth Suite'}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  sunaisystems.com
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'fa' 
                  ? 'بررسی موشکافانه ایرادات، نقشه راه رتبه ۱ گوگل، چک‌لیست حقوقی ثبت شرکت و آمادگی جذب مشتری B2B' 
                  : 'Deep B2B teardown, search dominance matrix, legal incorporation roadmap & procurement readiness.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Lang switch */}
            <div className="flex items-center p-1 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs">
              <button 
                onClick={() => setLang('en')} 
                className={`px-2.5 py-1 rounded transition-colors ${lang === 'en' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang('fa')} 
                className={`px-2.5 py-1 rounded transition-colors ${lang === 'fa' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                فارسی
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-2 flex gap-2 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('critic')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'critic' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            {lang === 'fa' ? 'ایرادات اساسی و راه‌حل‌ها' : 'Critical Teardown & Fixes'}
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'seo' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-400" />
            {lang === 'fa' ? 'استراتژی و معماری سئو' : 'SEO Keyword Matrix'}
          </button>

          <button
            onClick={() => setActiveTab('incorporation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'incorporation' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            {lang === 'fa' ? 'ثبت شرکت و جذب ۱۰ مشتری اول' : 'Incorporation & First 10 Deals'}
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'code' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FileCode className="w-4 h-4 text-sky-400" />
            {lang === 'fa' ? 'کدهای اسکیما و سئو' : 'Ready Schema & Robots'}
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-8 space-y-6 flex-1">
          {activeTab === 'critic' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
                <span className="font-semibold block mb-1">
                  {lang === 'fa' ? 'تحلیل منتقدانه: چرا اکثر استارتاپ‌های هوش مصنوعی اسناد شکست می‌خورند؟' : 'Critic Analysis: Why 90% of AI Document Startups Fail to Close Enterprise Deals'}
                </span>
                <p className="text-xs text-amber-300/80 leading-relaxed">
                  {lang === 'fa'
                    ? 'مشکل اصلی شرکت‌ها فناوری نیست؛ عدم شفافیت، نبود اثبات عددی بازگشت سرمایه (ROI)، و واهمه دپارتمان حقوقی و امنیتی از نشت اسناد است. در بازطراحی زیر، تمامی این ۴ مانع اساسی برطرف شده است.'
                    : 'Enterprises do not care about generic AI models; CFOs buy guaranteed time reduction and zero ERP disruption. Below are the 4 fundamental roadblocks and how this new platform rectifies them.'}
                </p>
              </div>

              <div className="grid gap-4">
                {CRITIC_FLAWS_AND_FIXES.map((item) => (
                  <div key={item.id} className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                        {item.area}
                      </span>
                      <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lang === 'fa' ? 'در این نسخه پیاده‌سازی و اصلاح شد' : item.status}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-white mb-2">
                      {lang === 'fa' ? item.titleFa : item.title}
                    </h4>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
                        <strong className="block text-rose-300 font-semibold mb-1">
                          {lang === 'fa' ? 'ایراد وب‌سایت قدیمی:' : 'Critical Flaw:'}
                        </strong>
                        {lang === 'fa' ? item.flawFa : item.flaw}
                        <div className="mt-1 text-slate-400">
                          <strong>{lang === 'fa' ? 'اثر مخرب: ' : 'Impact: '}</strong>
                          {lang === 'fa' ? item.impactFa : item.impact}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <strong className="block text-emerald-300 font-semibold mb-1">
                          {lang === 'fa' ? 'راه‌حل پیاده‌شده در این بازطراحی:' : 'Engineered Solution:'}
                        </strong>
                        {lang === 'fa' ? item.fixFa : item.fix}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-200 text-sm">
                <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  {lang === 'fa' ? 'نقشه تسخیر سئو در بازار B2B (SEO Dominance Strategy)' : 'High-Intent Enterprise Search Strategy'}
                </h3>
                <p className="text-xs text-blue-300/80 leading-relaxed">
                  {lang === 'fa'
                    ? 'به جای کلمات عمومی مانند "AI"، تمرکز سئو بر عبارت‌های جستجوی تجاری و تراکنشی مدیران فناوری و مالی (CFO/VP Ops) است که آماده عقد قرارداد هستند.'
                    : 'Target bottom-of-the-funnel keywords searched by CFOs, Operations Directors, and IT Leads looking to replace manual data entry teams.'}
                </p>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider font-mono">
                    <tr>
                      <th className="p-3">{lang === 'fa' ? 'کلمه کلیدی هدف' : 'Target Keyword'}</th>
                      <th className="p-3">{lang === 'fa' ? 'نیت جستجو' : 'Search Intent'}</th>
                      <th className="p-3">{lang === 'fa' ? 'حجم ماهانه' : 'Volume'}</th>
                      <th className="p-3">{lang === 'fa' ? 'صفحه فرود هدف' : 'Target URL Page'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                    {SEO_KEYWORD_STRATEGY.map((kw, i) => (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-medium text-white">{kw.keyword}</td>
                        <td className="p-3">
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {kw.intent}
                          </span>
                        </td>
                        <td className="p-3 font-mono tabular-nums text-slate-300">{kw.volume}</td>
                        <td className="p-3 font-mono text-blue-400">{kw.targetPage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 3 Pillars of SunAI SEO */}
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <h4 className="font-semibold text-white mb-2">1. Programmatic Solutions</h4>
                  <p className="text-slate-400">
                    {lang === 'fa' 
                      ? 'ایجاد صفحات فرود بر اساس نوع سند: فاکتورهای حسابداری، اسناد گمرکی، قراردادهای محرمانگی و پرونده‌های استخدام.' 
                      : 'Launch dedicated pages for /solutions/invoices, /solutions/logistics-bol, and /solutions/legal-ndas.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <h4 className="font-semibold text-white mb-2">2. ERP Integration Hubs</h4>
                  <p className="text-slate-400">
                    {lang === 'fa'
                      ? 'صفحات هدفمند برای "اتصال به SAP"، "پلاگین NetSuite" و "همگام‌سازی خودکار QuickBooks".'
                      : 'Rank for "SAP document OCR workflow", "NetSuite automated bills", and "QuickBooks invoice parser".'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                  <h4 className="font-semibold text-white mb-2">3. Schema.org Rich Snippets</h4>
                  <p className="text-slate-400">
                    {lang === 'fa'
                      ? 'ثبت کدهای SoftwareApplication و FAQPage جهت نمایش ستاره‌ها و پاسخ‌ها در نتایج گوگل.'
                      : 'Structured JSON-LD enabling Google Knowledge Graph cards and expandable FAQ rich results.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'incorporation' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm">
                <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  {lang === 'fa' ? 'نقشه راه ثبت شرکت بین‌المللی و جذب مشتری واقعی' : 'Company Formation & Enterprise Deal Closing Blueprint'}
                </h3>
                <p className="text-xs text-purple-300/80 leading-relaxed">
                  {lang === 'fa'
                    ? 'برای بستن قراردادهای دلاری سازمانی ($10k-$50k)، ثبت شرکت در دلاور (Delaware C-Corp) یا انگلستان (UK Ltd)، حساب بانکی شرکتی، و پکیج استاندارد Vendor Security ضروری است.'
                    : 'To bill enterprise contracts and win procurement audits, you need a Delaware C-Corp or UK Ltd entity, banking with ACH/wire capabilities, and ready-to-sign MSAs.'}
                </p>
              </div>

              <div className="space-y-4">
                {INCORPORATION_ROADMAP.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {step.deliverable}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {lang === 'fa' ? step.titleFa : step.title}
                    </h4>

                    <div className="space-y-2 text-xs">
                      {step.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2.5 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{lang === 'fa' ? task.taskFa : task.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    Schema.org JSON-LD (Ready to paste in &lt;head&gt;)
                  </h4>
                  <button
                    onClick={() => copyToClipboard(schemaJsonLd, 'schema')}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs transition-colors"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'schema' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {schemaJsonLd}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    robots.txt for sunaisystems.com
                  </h4>
                  <button
                    onClick={() => copyToClipboard(robotsTxt, 'robots')}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs transition-colors"
                  >
                    {copiedKey === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'robots' ? 'Copied!' : 'Copy robots.txt'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {robotsTxt}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>SunAI Systems Architecture Review · Verified for 2026 Production</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
          >
            {lang === 'fa' ? 'بستن و بازگشت به سایت' : 'Back to Live Website'}
          </button>
        </div>
      </div>
    </div>
  );
};
