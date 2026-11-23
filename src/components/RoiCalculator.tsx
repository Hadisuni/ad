import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemoModal: () => void;
  lang: 'en' | 'fa';
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemoModal, lang }) => {
  const [docVolume, setDocVolume] = useState<number>(4500);
  const [minutesPerDoc, setMinutesPerDoc] = useState<number>(14);
  const [hourlyWage, setHourlyWage] = useState<number>(36);
  const [errorRate, setErrorRate] = useState<number>(4.2);

  // Calculations
  const annualDocs = docVolume * 12;
  const manualHoursPerYear = (annualDocs * minutesPerDoc) / 60;
  const sunaiHoursPerYear = (annualDocs * 0.25) / 60; // 15 seconds per doc with SunAI
  const annualHoursSaved = Math.round(manualHoursPerYear - sunaiHoursPerYear);

  const annualLaborSavings = Math.round(annualHoursSaved * hourlyWage);
  const annualErrorCostSaved = Math.round(annualDocs * (errorRate / 100) * 120); // estimated $120 to fix manual accounting mistake
  const totalAnnualSavings = annualLaborSavings + annualErrorCostSaved;

  // Estimated SunAI platform cost
  const estimatedSunAiAnnualCost = Math.round(annualDocs * 0.28);
  const netSavings = totalAnnualSavings - estimatedSunAiAnnualCost;
  const roiPercentage = Math.round((netSavings / estimatedSunAiAnnualCost) * 100);
  const paybackWeeks = ((estimatedSunAiAnnualCost / totalAnnualSavings) * 52).toFixed(1);

  return (
    <section id="roi-calculator" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3">
            <Calculator className="w-4 h-4" />
            <span>Enterprise Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {lang === 'fa' 
              ? 'ماشین‌حساب بازگشت سرمایه و صرفه‌جویی هزینه سازمانی' 
              : 'Calculate Your Enterprise Cost & Hours Saved'}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {lang === 'fa'
              ? 'با وارد کردن تعداد اسناد ماهانه و هزینه ساعتی تیم عملیات یا مالی، سود ناخالص و ساعات کاری آزادشده سازمان را در لحظه بسنجید.'
              : 'Enter your monthly document volume and team loaded cost to model projected manual labor reduction, error eradication, and net annual ROI.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">
              {lang === 'fa' ? 'پارامترهای عملیاتی سازمان شما' : 'Operational Variables'}
            </h3>

            {/* Slider 1: Monthly Doc Volume */}
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-300 font-medium">
                  {lang === 'fa' ? 'حجم اسناد پردازش‌شده در ماه' : 'Monthly Document Volume'}
                </span>
                <span className="font-mono text-blue-400 font-bold tabular-nums">
                  {docVolume.toLocaleString()} docs/mo
                </span>
              </div>
              <input 
                type="range"
                min="500"
                max="25000"
                step="500"
                value={docVolume}
                onChange={(e) => setDocVolume(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>500</span>
                <span>10,000</span>
                <span>25,000+</span>
              </div>
            </div>

            {/* Slider 2: Current Manual Minutes */}
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-300 font-medium">
                  {lang === 'fa' ? 'زمان بررسی و ورود دستی هر سند (دقیقه)' : 'Manual Review Time per Document'}
                </span>
                <span className="font-mono text-blue-400 font-bold tabular-nums">
                  {minutesPerDoc} minutes
                </span>
              </div>
              <input 
                type="range"
                min="3"
                max="35"
                step="1"
                value={minutesPerDoc}
                onChange={(e) => setMinutesPerDoc(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>3 mins (Fast invoice)</span>
                <span>15 mins (Standard)</span>
                <span>35 mins (Complex contract)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Wage */}
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-300 font-medium">
                  {lang === 'fa' ? 'هزینه ساعتی پرسنل مالی / عملیات ($)' : 'Loaded Hourly Cost of Operations FTE'}
                </span>
                <span className="font-mono text-blue-400 font-bold tabular-nums">
                  ${hourlyWage} / hour
                </span>
              </div>
              <input 
                type="range"
                min="18"
                max="85"
                step="1"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>$18/hr</span>
                <span>$40/hr</span>
                <span>$85/hr</span>
              </div>
            </div>

            {/* Slider 4: Error Rate */}
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-300 font-medium">
                  {lang === 'fa' ? 'درصد خطای انسانی فعلی و عدم انطباق' : 'Estimated Manual Exception & Error Rate'}
                </span>
                <span className="font-mono text-amber-400 font-bold tabular-nums">
                  {errorRate}%
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={errorRate}
                onChange={(e) => setErrorRate(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                  {lang === 'fa' ? 'پیش‌بینی بازده مالی سالانه' : 'Projected Annual Value'}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold font-mono">
                  {roiPercentage}% Projected ROI
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400 uppercase font-mono tracking-wider mb-1">
                  {lang === 'fa' ? 'مجموع صرفه‌جویی مالی سالانه' : 'Net Annual Cost Savings'}
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                  ${totalAnnualSavings.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  Labor savings: <strong className="text-emerald-400">${annualLaborSavings.toLocaleString()}</strong> + Error dispute savings: <strong className="text-emerald-400">${annualErrorCostSaved.toLocaleString()}</strong>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Annual Hours Saved</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white tabular-nums">
                    {annualHoursSaved.toLocaleString()} hrs
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Equivalent to {(annualHoursSaved / 2080).toFixed(1)} full-time operators
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Payback Period</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                    {paybackWeeks} Weeks
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Full break-even in under 1 month
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Includes 99.4% OCR accuracy guarantee, human-in-the-loop exception dashboard, and native ERP connectors.
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                <span>{lang === 'fa' ? 'درخواست گزارش تحلیلی اختصاصی برای سازمان شما' : 'Request Custom Financial Business Case'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
