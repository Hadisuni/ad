import React from 'react';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

interface FooterProps {
  onOpenCriticDrawer: () => void;
  lang: 'en' | 'fa';
}

export const Footer: React.FC<FooterProps> = ({ onOpenCriticDrawer, lang }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white text-base font-bold">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                S
              </div>
              <span>SunAI Systems</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              {lang === 'fa' 
                ? 'پلتفرم هوشمند مدیریت و اتوماسیون جریان اسناد سازمانی. تبدیل اسناد متنی، فاکتورها و قراردادها به داده‌های پردازش‌پذیر و یکپارچه‌سازی با نرم‌افزارهای سازمانی.'
                : 'Autonomous document extraction, validation, and bi-directional ERP orchestration for global enterprises, logistics carriers, and financial institutions.'}
            </p>
            <div className="text-slate-500 text-[11px]">
              sunaisystems.com · Incorporating in Delaware, USA · Registered Enterprise Architecture
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {lang === 'fa' ? 'راهکارها' : 'Solutions'}
            </div>
            <ul className="space-y-2">
              <li><a href="#pipeline-demo" className="hover:text-white transition-colors">Accounts Payable Invoices</a></li>
              <li><a href="#pipeline-demo" className="hover:text-white transition-colors">Contract & NDA Lifecycle</a></li>
              <li><a href="#pipeline-demo" className="hover:text-white transition-colors">Customs & Ocean Bills of Lading</a></li>
              <li><a href="#pipeline-demo" className="hover:text-white transition-colors">HR Employee File Ingestion</a></li>
            </ul>
          </div>

          {/* Integrations */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {lang === 'fa' ? 'یکپارچه‌سازی' : 'Integrations'}
            </div>
            <ul className="space-y-2">
              <li><a href="#security-trust" className="hover:text-white transition-colors">SAP S/4HANA & ECC</a></li>
              <li><a href="#security-trust" className="hover:text-white transition-colors">Oracle NetSuite ERP</a></li>
              <li><a href="#security-trust" className="hover:text-white transition-colors">Microsoft Dynamics 365</a></li>
              <li><a href="#security-trust" className="hover:text-white transition-colors">REST & GraphQL Webhooks</a></li>
            </ul>
          </div>

          {/* Governance & Founder Audit */}
          <div className="space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px] font-mono">
              {lang === 'fa' ? 'امنیت و استراتژی' : 'Governance & Founder'}
            </div>
            <ul className="space-y-2">
              <li><a href="#security-trust" className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#security-trust" className="hover:text-white transition-colors">SOC 2 Type II Compliance</a></li>
              <li><a href="#security-trust" className="hover:text-white transition-colors">GDPR & Zero-Retention</a></li>
              <li>
                <button 
                  onClick={onOpenCriticDrawer}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors text-left"
                >
                  {lang === 'fa' ? 'گزارش منتقد و سئو' : 'Executive SEO Strategy'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SunAI Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Master Services Agreement</span>
            <span>Security Trust Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
