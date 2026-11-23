import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, ArrowRight, Building, Mail, User, Layers } from 'lucide-react';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'fa';
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose, lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    volume: '5,000 - 25,000 docs/mo',
    workflow: 'Accounts Payable & Invoices',
    erp: 'SAP / NetSuite',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'fa' ? 'درخواست پایلوت سازمانی و جلسه دمو' : 'Request Enterprise Pilot & Discovery'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'fa' ? 'پردازش آزمایشی ۱,۰۰۰ سند واقعی سازمان شما بدون ریسک' : '14-Day Zero-Risk POC with 1,000 of your actual documents'}
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

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">
              {lang === 'fa' ? 'درخواست پایلوت شما با موفقیت ثبت شد' : 'Enterprise Pilot Request Confirmed'}
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {lang === 'fa'
                ? `از اعتماد شما سپاسگزاریم. بسته شروع سریع و لینک تنظیم جلسه مستقیم با مدیر مهندسی به آدرس ${formData.email} ارسال شد.`
                : `Thank you, ${formData.name}. Our enterprise solutions architect has received your workflow specifications for ${formData.company}. An NDA and sandbox provisioning link have been dispatched to ${formData.email}.`}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-left space-y-1 font-mono">
              <div>Reference ID: <strong className="text-blue-400">POC-SUNAI-{(Math.random() * 90000 + 10000).toFixed(0)}</strong></div>
              <div>Target Workflow: <span className="text-slate-200">{formData.workflow}</span></div>
              <div>ERP Sync: <span className="text-slate-200">{formData.erp}</span></div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              {lang === 'fa' ? 'بستن پنجره' : 'Done & Return'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'ایمیل سازمانی (Work Email)' : 'Corporate Work Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@enterprise.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'نام شرکت یا سازمان' : 'Company Name *'}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Global Corp"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'حجم تخمینی اسناد ماهانه' : 'Monthly Document Volume'}
                </label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  <option>1,000 - 5,000 docs/mo</option>
                  <option>5,000 - 25,000 docs/mo</option>
                  <option>25,000 - 100,000 docs/mo</option>
                  <option>100,000+ docs/mo (Global Enterprise)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'نوع اسناد و جریان کار' : 'Core Document Flow'}
                </label>
                <select
                  value={formData.workflow}
                  onChange={(e) => setFormData({ ...formData, workflow: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  <option>Accounts Payable & Invoices</option>
                  <option>Legal Contracts & NDAs</option>
                  <option>Logistics, Shipping & Customs Bills</option>
                  <option>HR Employee Onboarding & Compliance</option>
                  <option>Healthcare & HIPAA Records</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {lang === 'fa' ? 'سیستم حسابداری / ERP فعلی' : 'Current Target ERP / System'}
                </label>
                <select
                  value={formData.erp}
                  onChange={(e) => setFormData({ ...formData, erp: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  <option>SAP S/4HANA or ECC</option>
                  <option>Oracle NetSuite</option>
                  <option>Microsoft Dynamics 365</option>
                  <option>QuickBooks Enterprise</option>
                  <option>Custom Internal Database / REST API</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {lang === 'fa' ? 'یادداشت یا نیازمندی خاص سازمان (اختیاری)' : 'Specific Integration Requirements (Optional)'}
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g., Need VPC deployment in Frankfurt, or custom 3-way matching logic for purchase orders..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <span>{submitting ? 'Connecting Secure Gateway...' : (lang === 'fa' ? 'ثبت و شروع پایلوت رایگان سازمانی' : 'Start 14-Day Enterprise Pilot')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Mutual Non-Disclosure Agreement
              </span>
              <span>·</span>
              <span>No Credit Card Required</span>
              <span>·</span>
              <span>Dedicated Technical Account Manager</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
