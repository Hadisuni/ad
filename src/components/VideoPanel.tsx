import React, { useEffect, useState } from 'react';
import { Clapperboard } from 'lucide-react';

import { fetchVideoStatus, videoFileUrl, type VideoStatus } from '../lib/videoStatus';

interface VideoPanelProps {
  campaignId: string;
  lang: 'en' | 'fa';
}

const POLL_MS = 15_000;

const TEXT = {
  none: { en: 'No video has been made for this campaign yet. The automation starts it.', fa: 'هنوز برای این کمپین ویدیویی ساخته نشده است. اتوماسیون آن را شروع می‌کند.' },
  running: { en: 'The video is being made. This takes a few minutes; this page checks by itself.', fa: 'ویدیو در حال ساخت است. چند دقیقه طول می‌کشد و این صفحه خودش بررسی می‌کند.' },
  failed: { en: 'The video could not be made.', fa: 'ساخت ویدیو ممکن نشد.' },
  unavailable: { en: 'The video status could not be loaded right now.', fa: 'وضعیت ویدیو الان بارگذاری نشد.' },
  caption: {
    en: 'AI-made video ad (vertical, 8 seconds). The brand name, badge and call to action are not in the clip; add them when you edit.',
    fa: 'ویدیوی تبلیغاتی ساخته‌شده با هوش مصنوعی (عمودی، ۸ ثانیه). نام برند، نشان و دکمه‌ی فراخوان داخل کلیپ نیستند؛ هنگام ویرایش اضافه کنید.',
  },
};

/** The video ad for a campaign sent by the automation: progress while it renders, then the clip to watch. */
export const VideoPanel: React.FC<VideoPanelProps> = ({ campaignId, lang }) => {
  const [video, setVideo] = useState<VideoStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    const check = async () => {
      const next = await fetchVideoStatus(campaignId);
      if (cancelled) return;
      setVideo(next);
      if (next.status === 'running') timer = window.setTimeout(check, POLL_MS);
    };
    void check();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [campaignId]);

  return (
    <section aria-labelledby="video-heading" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <h2 id="video-heading" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400">
        <Clapperboard className="w-3.5 h-3.5" aria-hidden="true" />
        {lang === 'fa' ? 'ویدیوی تبلیغاتی' : 'Video ad'}
      </h2>

      {video?.status === 'done' ? (
        <figure className="space-y-2">
          <video controls preload="metadata" playsInline className="w-full max-w-xs mx-auto rounded-xl bg-black aspect-[9/16]" src={videoFileUrl(campaignId)} aria-label={lang === 'fa' ? 'ویدیوی تبلیغاتی' : 'Video ad'} />
          <figcaption className="text-[11px] text-slate-400">{TEXT.caption[lang]}</figcaption>
        </figure>
      ) : (
        <p role="status" className="text-xs text-slate-300">
          {video === null ? '…' : TEXT[video.status][lang]}
          {video?.status === 'failed' && video.error ? ` (${video.error})` : ''}
        </p>
      )}
    </section>
  );
};
