import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  FileText, 
  CheckCircle2, 
  Download, 
  Globe2, 
  EyeOff,
  Clock,
  ChevronDown
} from 'lucide-react';

interface SecurityTrustCenterProps {
  onOpenDemoModal: () => void;
  lang: 'en' | 'fa';
}

export const SecurityTrustCenter: React.FC<SecurityTrustCenterProps> = ({ onOpenDemoModal, lang }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const securityPillars = [
    {
      icon: <Lock className="w-5 h-5 text-blue-400" />,
      titleEn: 'Zero-Retention Model Policy',
      titleFa: 'تضمین عدم آموزش مدل با داده‌های مشتری',
      descEn: 'Your business documents, contracts, and financial statements are strictly processed in isolated ephemeral containers. They are never retained or used to train public or foundational AI models.',
      descFa: 'اسناد محرمانه، قراردادها و صورت‌حساب‌های مالی سازمان شما فقط در محیط موقت پردازش می‌شوند و هرگز برای آموزش مدل‌های هوش مصنوعی عمومی ذخیره یا استفاده نمی‌شوند.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      titleEn: 'SOC 2 Type II & ISO 27001 Alignment',
      titleFa: 'انطباق با استانداردهای بین‌المللی SOC 2 و ISO 27001',
      descEn: 'Rigorous organizational controls covering access management, continuous audit logging, role-based access control (RBAC), and automated penetration testing.',
      descFa: 'کنترل‌های دسترسی دقیق مبتنی بر نقش (RBAC)، ثبت لحظه‌ای رویدادهای سیستمی (Audit Trail) و تست‌های نفوذ دوره‌ای مداوم.'
    },
    {
      icon: <Server className="w-5 h-5 text-purple-400" />,
      titleEn: 'Data Residency & Hybrid Deployment',
      titleFa: 'استقرار درون‌سازمانی (On-Prem) و سرورهای اختصاصی',
      descEn: 'Deploy in your preferred region (US East/West, EU Frankfurt for GDPR, or AWS/GCP GovCloud). Support for hybrid containerized VPC deployment behind your enterprise firewall.',
      descFa: 'قابلیت انتخاب منطقه ذخیره‌سازی ابری (اروپا جهت تطابق با GDPR، یا آمریکا) یا استقرار اختصاصی درون شبکه خصوصی (VPC/On-Premise) پشت فایروال سازمان.'
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      titleEn: '99.9% Enterprise SLA Guarantee',
      titleFa: 'تعهدنامه رسمی پایداری ۹۹.۹٪ (SLA)',
      descEn: 'Backed by financial service credits. Dedicated enterprise support engineers with under 15-minute response times for Severity 1 production issues.',
      descFa: 'تضمین رسمی در دسترس بودن سرویس با جبران خسارت مالی در قرارداد سازمانی و پشتیبانی فنی با زمان پاسخگویی زیر ۱۵ دقیقه.'
    }
  ];

  const securityFaqs = [
    {
      qEn: 'How does SunAI guarantee data privacy during document extraction?',
      qFa: 'چگونه حریم خصوصی داده‌های سازمانی در پردازش اسناد تضمین می‌شود؟',
      aEn: 'Every document is encrypted via AES-256 at rest and TLS 1.3 in transit. Processing is executed in dedicated isolated containers with per-tenant encryption keys (KMS). Once parsed and confirmed via webhook to your ERP, memory allocations are wiped.',
      aFa: 'کلیه اسناد با استاندارد AES-256 در حالت ذخیره و TLS 1.3 در انتقال رمزنگاری می‌شوند. پس از استخراج و تایید ارسال داده‌ها به ERP سازمان، حافظه موقت پاکسازی می‌شود.'
    },
    {
      qEn: 'Can SunAI connect to legacy on-premise ERPs like older SAP ECC 6.0 or AS400?',
      qFa: 'آیا امکان اتصال به سیستم‌های قدیمی‌تر سازمان (Legacy ERPs) وجود دارد؟',
      aEn: 'Yes. SunAI provides both modern REST/GraphQL APIs and secure lightweight Agent Gateways that run inside your private network to safely poll SFTP folders or local database endpoints.',
      aFa: 'بله. علاوه بر وب‌هوک و API، گیت‌وی سبک اختصاصی درون شبکه محلی شرکت شما نصب می‌شود و اسناد را از پوشه‌های امن SFTP یا دیتابیس داخلی همگام می‌کند.'
    },
    {
      qEn: 'What legal documents do you provide for corporate procurement and vendor onboarding?',
      qFa: 'چه اسناد حقوقی برای فرآیند استعلام و ورود تامین‌کننده (Procurement) ارائه می‌شود؟',
      aEn: 'We provide our Standard Enterprise MSA (Master Services Agreement), GDPR-compliant Data Processing Addendum (DPA), Business Associate Agreement (BAA for HIPAA), and pre-filled SIG Lite security questionnaires.',
      aFa: 'پکیج کامل شامل قرارداد خدمات سازمانی (MSA)، الحاقیه پردازش داده (DPA)، فرم محرمانگی متقابل (Mutual NDA) و پاسخنامه استاندارد امنیت فناوری اطلاعات (SIG Lite).'
    }
  ];

  const handleDownloadWhitepaper = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="security-trust" className="py-20 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Enterprise Security & Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {lang === 'fa' 
              ? 'امنیت، انطباق و اعتبارسنجی در سطح استانداردهای بانکی و سازمانی' 
              : 'Built for Enterprise Security & Procurement Audits'}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {lang === 'fa'
              ? 'SunAI Systems با رویکرد امنیت در طراحی (Security-by-Design) معماری شده است تا سخت‌گیرانه‌ترین ممیزی‌های دپارتمان فناوری اطلاعات و امنیت سازمان‌ها را به راحتی پشت سر بگذارد.'
              : 'Enterprise procurement teams and CISOs demand uncompromising data protection. Here is how SunAI safeguards your mission-critical corporate intelligence.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {securityPillars.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-fit">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'fa' ? p.titleFa : p.titleEn}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'fa' ? p.descFa : p.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Vendor Procurement Pack Callout */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-slate-950 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mb-16">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
              Procurement & Vendor Onboarding
            </span>
            <h3 className="text-xl font-bold text-white">
              {lang === 'fa' ? 'دریافت بسته مدارک امنیتی و قراردادهای تیپ سازمانی' : 'Need to Complete a Vendor Security Assessment?'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fa'
                ? 'پرسشنامه استاندارد امنیتی، نمونه قرارداد MSA، الحاقیه DPA و تعهدنامه حفظ محرمانگی را مستقیماً برای تیم حقوقی و IT خود دریافت کنید.'
                : 'Download our comprehensive Security Whitepaper, pre-filled SIG Lite audit questionnaire, and sample Master Services Agreement (MSA) for your legal and IT review.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleDownloadWhitepaper}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>{downloadSuccess ? 'Downloaded Vendor Kit (PDF)' : 'Download Vendor Kit'}</span>
            </button>

            <button
              onClick={onOpenDemoModal}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <span>{lang === 'fa' ? 'تنظیم جلسه با مدیر فنی' : 'Schedule CISO Briefing'}</span>
            </button>
          </div>
        </div>

        {/* Security & Architecture FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-center text-lg font-bold text-white mb-6">
            {lang === 'fa' ? 'پرسش‌های متداول امنیت و اتصال سازمانی' : 'Enterprise Procurement & Architecture FAQ'}
          </h3>

          {securityFaqs.map((faq, fIdx) => (
            <div 
              key={fIdx}
              className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
              >
                <span className="text-sm font-semibold text-white">
                  {lang === 'fa' ? faq.qFa : faq.qEn}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === fIdx ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {openFaq === fIdx && (
                <div className="p-4 pt-1 text-xs text-slate-400 border-t border-slate-800/80 bg-slate-900/20 leading-relaxed">
                  {lang === 'fa' ? faq.aFa : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
