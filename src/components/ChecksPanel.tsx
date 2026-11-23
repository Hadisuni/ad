import React, { useMemo } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

import { checkCampaign, type Check, type CheckSeverity } from '../lib/adChecks';
import type { AdCampaign } from '../types/ads';

interface ChecksPanelProps {
  campaign: AdCampaign;
  lang: 'en' | 'fa';
}

const SEVERITY_ORDER: Record<CheckSeverity, number> = { error: 0, warn: 1, info: 2 };

const SEVERITY_STYLE: Record<CheckSeverity, { icon: React.ReactNode; row: string }> = {
  error: { icon: <XCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />, row: 'border-red-500/30 bg-red-950/20' },
  warn: { icon: <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" aria-hidden="true" />, row: 'border-amber-500/30 bg-amber-950/20' },
  info: { icon: <Info className="w-4 h-4 shrink-0 text-sky-400" aria-hidden="true" />, row: 'border-slate-700 bg-slate-900' },
};

const SEVERITY_LABEL: Record<CheckSeverity, { en: string; fa: string }> = {
  error: { en: 'Fix', fa: 'رفع' },
  warn: { en: 'Review', fa: 'بررسی' },
  info: { en: 'Note', fa: 'نکته' },
};

/** The ad and SEO problems in the campaign on screen: platform limits, hashtags, alt text, language and unsourced figures. */
export const ChecksPanel: React.FC<ChecksPanelProps> = ({ campaign, lang }) => {
  const checks = useMemo(
    () => [...checkCampaign(campaign)].sort((a: Check, b: Check) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]),
    [campaign],
  );
  const errorCount = checks.filter((check) => check.severity === 'error').length;

  return (
    <section aria-labelledby="checks-heading" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="checks-heading" className="text-xs font-mono uppercase tracking-wider text-purple-400">
          {lang === 'fa' ? 'بررسی تبلیغ و سئو' : 'Ad & SEO checks'}
        </h2>
        <span className="text-[11px] text-slate-400">
          {checks.length === 0
            ? (lang === 'fa' ? 'همه‌چیز درست است' : 'All clear')
            : lang === 'fa'
              ? `${errorCount} خطا · ${checks.length} مورد`
              : `${errorCount} error${errorCount === 1 ? '' : 's'} · ${checks.length} total`}
        </span>
      </div>

      {checks.length === 0 ? (
        <p className="flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          {lang === 'fa' ? 'محدودیت‌های پلتفرم‌ها، متن alt و زبان بررسی شد و مشکلی نیست.' : 'Platform limits, alt text and language all check out.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {checks.map((check) => (
            <li key={check.id} className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs text-slate-200 ${SEVERITY_STYLE[check.severity].row}`}>
              {SEVERITY_STYLE[check.severity].icon}
              <span>
                <span className="font-semibold">{SEVERITY_LABEL[check.severity][lang]}</span>
                <span className="mx-1 text-slate-500">·</span>
                {check.message[lang]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
