import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Linkedin, 
  Instagram, 
  Search, 
  Copy, 
  Check, 
  PhoneCall, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Share2,
  ThumbsUp,
  MessageSquare,
  Repeat
} from 'lucide-react';

interface SocialAdsHubProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'fa';
}

export const SocialAdsHub: React.FC<SocialAdsHubProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'meta-feed' | 'reels-story' | 'linkedin-b2b' | 'google-ppc' | 'lead-magnets'>('meta-feed');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Growth Lead Magnet interactive simulator state
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [testBusinessName, setTestBusinessName] = useState('');
  const [phoneTestTriggered, setPhoneTestTriggered] = useState(false);
  const [countdown, setCountdown] = useState(60);

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTriggerPhoneTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhoneNumber) return;
    setPhoneTestTriggered(true);
    let timer = 60;
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const smbPostCopy = `Every missed call is a lost $1,500 customer. 📞

When your front desk is busy or it's after 6:00 PM, 62% of potential clients hang up and immediately call your nearest competitor.

Meet SunAI 24/7 Receptionist:
✅ Answers every phone call in natural human speech
✅ Instantly answers FAQs, pricing & services
✅ Books appointments directly into your calendar
✅ Sends instant confirmation SMS with location & intake links
✅ Zero sick days, zero missed revenue

Plans in CAD. Works on your existing business phone number within 48 hours.

👉 Tap the link in bio or visit sunaisystems.com to test our live voice demo in 60 seconds!

#AIReceptionist #SmallBusinessCanada #DentalClinic #Contractors #LocalBusinessGrowth #VancouverBusiness #TorontoBusiness`;

  const reelsCopy = `It was 10:42 PM on a Sunday...
A client called our client's clinic to book a $3,200 procedure.
Nobody was at the office. Nobody picked up the desk phone.

Yet the appointment was confirmed, notes were logged, and confirmation SMS was sent.

How? SunAI 24/7 Voice Receptionist.
No missed calls. Ever.

Try the 60-second live test at sunaisystems.com 🚀`;

  const linkedinCopy = `Still paying operations staff to manually type supplier invoices into SAP and NetSuite? 📄➡️💻

Manual data entry isn't just slow—it introduces invoice variance errors, missed early-payment discounts, and costly reconciliation cycles.

SunAI Systems autonomous document pipeline:
🔹 Ingests multi-currency invoices, POs, and complex contracts
🔹 Performs automated 3-way matching in under 90 seconds
🔹 Flags discrepancy exceptions to human-in-the-loop reviewers
🔹 Pushes clean, validated records directly into SAP S/4HANA & NetSuite
🔹 Bank-grade AES-256 encryption & strict Zero-Retention privacy (your data is NEVER used to train public AI models).

Book your 14-day zero-risk Proof of Concept today. We'll process 1,000 of your actual documents side-by-side with your team.

👉 Learn more at sunaisystems.com`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 to-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {lang === 'fa' ? 'استودیوی تبلیغات ۴K و ابزارهای جذب مشتری' : '4K Social Media Ads & Growth Campaign Studio'}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                  READY TO LAUNCH
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'fa'
                  ? 'مشاهده زنده تبلیغات آماده شبکه‌های اجتماعی برای بیزنس‌های کوچک و شرکت‌های بزرگ سازمانی'
                  : 'High-converting ad mockups, copy, and growth lead magnets inspired by top AI scale-ups.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-900/80 border-b border-slate-800 px-6 py-2 flex gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('meta-feed')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'meta-feed'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram / Meta Feed (1:1)</span>
          </button>

          <button
            onClick={() => setActiveTab('reels-story')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'reels-story'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>Reels & Stories (9:16)</span>
          </button>

          <button
            onClick={() => setActiveTab('linkedin-b2b')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'linkedin-b2b'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>LinkedIn B2B Feed (Enterprise)</span>
          </button>

          <button
            onClick={() => setActiveTab('google-ppc')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'google-ppc'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Google Search Ad Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('lead-magnets')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'lead-magnets'
                ? 'bg-amber-600 text-white'
                : 'text-amber-400 hover:text-white bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Viral Lead Magnet Simulator</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Meta / Instagram 1:1 Feed */}
          {activeTab === 'meta-feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Visual Mockup */}
              <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Simulated Instagram Post Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-slate-800 bg-slate-900/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      S
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>sunaisystems</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                      <div className="text-[10px] text-slate-400">Sponsored · 24/7 AI Receptionist</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-xs font-bold">•••</div>
                </div>

                {/* 4K Image Creative */}
                <div className="aspect-square bg-slate-900 relative group overflow-hidden">
                  <img
                    src="/src/assets/images/ad_smb_receptionist_square_1794454357509.jpg"
                    alt="SunAI SMB AI Receptionist Social Ad 4K"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur rounded-lg border border-slate-700/60 text-[10px] font-mono text-emerald-400">
                    Live Booking Notification Simulated
                  </div>
                </div>

                {/* Simulated Action Bar */}
                <div className="p-3.5 space-y-2 bg-slate-950">
                  <div className="flex items-center justify-between text-slate-300">
                    <div className="flex items-center gap-4">
                      <Heart className="w-5 h-5 hover:text-rose-500 cursor-pointer" />
                      <MessageCircle className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                      <Send className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
                    </div>
                    <Bookmark className="w-5 h-5 hover:text-amber-400 cursor-pointer" />
                  </div>
                  <div className="text-xs font-semibold text-white">428 likes</div>
                  <div className="text-xs text-slate-300 line-clamp-2">
                    <strong className="text-white">sunaisystems</strong> Every missed call is a lost $1,500 customer. 24/7 AI Receptionist answers calls and books appointments in CAD...
                  </div>
                </div>
              </div>

              {/* Right Column: Copyable Ad Set */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'fa' ? 'متن کامل آگهی اینستاگرام / فیس‌بوک (آماده انتشار)' : 'Instagram & Facebook Ad Copy (Ready to Launch)'}
                  </h4>
                  <button
                    onClick={() => copyText(smbPostCopy, 'meta')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedKey === 'meta' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'meta' ? 'Copied!' : 'Copy Ad Text'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
                  {smbPostCopy}
                </div>

                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-300">
                  <strong>Audience Targeting:</strong> Small Business Owners, Dental Clinics, Law Firms, HVAC/Roofing Contractors in British Columbia, Ontario, Alberta (Ages 28–62).
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Reels / Story 9:16 Vertical */}
          {activeTab === 'reels-story' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Smartphone Mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] rounded-[36px] p-3 bg-slate-800 border-4 border-slate-700 shadow-2xl relative">
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
                  
                  <div className="rounded-[24px] overflow-hidden aspect-[9/16] relative bg-slate-950">
                    <img 
                      src="/src/assets/images/ad_reels_phone_answering_1794454357907.jpg" 
                      alt="SunAI Vertical Story Ad 4K"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-white text-[11px]">
                        <span className="font-bold">SunAI Systems · Sponsored</span>
                        <X className="w-3.5 h-3.5" />
                      </div>

                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur border border-amber-500/30 text-[10px] text-amber-200">
                          ⚡ 10:42 PM: $3,200 Client Appointment Booked Automatically
                        </div>
                        <div className="w-full py-2 bg-blue-600 text-white rounded-lg text-center text-xs font-bold shadow-lg">
                          Swipe Up / Book Free Pilot
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
                </div>
              </div>

              {/* Story Ad Copy & Script */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'fa' ? 'سناریو و متن استوری / ریلز / تیک‌تاک' : 'Reels / TikTok Script & Overlay Copy'}
                  </h4>
                  <button
                    onClick={() => copyText(reelsCopy, 'reels')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedKey === 'reels' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'reels' ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {reelsCopy}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Audio Recommendation</span>
                    <strong className="text-white">Lo-Fi ambient executive synth</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Best Time to Post</span>
                    <strong className="text-white">Tuesday – Thursday, 7:00 PM</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: LinkedIn B2B Feed */}
          {activeTab === 'linkedin-b2b' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LinkedIn Post Mockup */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>SunAI Systems</span>
                        <span className="text-slate-500">· 1st</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Autonomous Enterprise Document Workflows · Sponsored</div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold cursor-pointer">+ Follow</span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  Still paying finance staff to manually type supplier invoices into SAP and NetSuite? Automate multi-currency extraction with 99.4% precision and zero model retention.
                </div>

                {/* 4K Visual */}
                <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] relative">
                  <img
                    src="/src/assets/images/ad_linkedin_enterprise_banner_1794454358791.jpg"
                    alt="SunAI LinkedIn 16:9 Banner"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">sunaisystems.com</div>
                    <div className="text-xs font-bold text-white">Automate Document Workflows & ERP Ingestion</div>
                  </div>
                  <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                    Book Pilot
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><ThumbsUp className="w-4 h-4" /> Like</span>
                  <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><MessageSquare className="w-4 h-4" /> Comment</span>
                  <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-pointer"><Repeat className="w-4 h-4" /> Repost</span>
                </div>
              </div>

              {/* LinkedIn Copyable Kit */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'fa' ? 'متن آگهی لینکدین B2B' : 'LinkedIn Enterprise Copy'}
                  </h4>
                  <button
                    onClick={() => copyText(linkedinCopy, 'linkedin')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'linkedin' ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                  {linkedinCopy}
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <strong>Job Title Targeting:</strong> CFO, VP Finance, Controller, Operations Director, Head of Procurement, Supply Chain VP.
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Google PPC Search */}
          {activeTab === 'google-ppc' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-white text-slate-900 space-y-3 font-sans shadow-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-900">Sponsored</span>
                  <span>·</span>
                  <span>https://sunaisystems.com/ai-receptionist</span>
                </div>

                <h3 className="text-lg font-semibold text-blue-800 hover:underline cursor-pointer">
                  24/7 AI Phone Receptionist | Never Miss a Customer Call
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Natural human voice AI receptionist answering customer calls, booking appointments, and following up via SMS 24/7. Trusted by Canadian clinics & contractors. Plans in CAD. Test live voice demo.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-4 border-t border-slate-200 text-xs text-blue-800">
                  <div>
                    <div className="font-bold hover:underline cursor-pointer">Listen to Live Voice Demo</div>
                    <div className="text-[11px] text-slate-500">Hear how naturally our AI answers client questions in 60s.</div>
                  </div>
                  <div>
                    <div className="font-bold hover:underline cursor-pointer">Transparent Pricing (CAD)</div>
                    <div className="text-[11px] text-slate-500">Affordable monthly tiers with no long-term contracts.</div>
                  </div>
                </div>
              </div>

              {/* Enterprise Google Ad */}
              <div className="p-5 rounded-2xl bg-white text-slate-900 space-y-3 font-sans shadow-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-900">Sponsored</span>
                  <span>·</span>
                  <span>https://sunaisystems.com/document-workflow</span>
                </div>

                <h3 className="text-lg font-semibold text-blue-800 hover:underline cursor-pointer">
                  Automate Invoice Processing & ERP Sync | SunAI Document Engine
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Extract complex multi-currency invoices, POs & contracts in under 90s. Native SAP S/4HANA & NetSuite integration with human-in-the-loop audit certainty. Request 14-day pilot.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Viral Lead Magnet Simulator (Inspired by DataAnnotation) */}
          {activeTab === 'lead-magnets' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Tool 1: 60-Second Phone Test */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase">
                  <PhoneCall className="w-4 h-4" />
                  <span>SMB Viral Hook</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {lang === 'fa' ? 'تست ۶۰ ثانیه‌ای تماس تلفنی هوش مصنوعی' : 'The 60-Second Live AI Phone Call Test'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'fa'
                    ? 'شماره تلفن و نام بیزنس خود را وارد کنید؛ هوش مصنوعی ما در کمتر از ۶۰ ثانیه به شما زنگ می‌زند و به عنوان یک مشتری سوال می‌پرسد تا کیفیت صدا را روی گوشی خودتان بشنوید!'
                    : 'Enter your business phone number. Our AI will place a test call in 60 seconds acting as a client to demonstrate the natural voice clarity.'}
                </p>

                {phoneTestTriggered ? (
                  <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
                    <div className="text-2xl font-bold font-mono text-amber-400">
                      Calling in {countdown}s...
                    </div>
                    <div className="text-xs text-slate-300">
                      Dialing <strong className="text-white">{testPhoneNumber}</strong> for <strong className="text-white">{testBusinessName || 'Your Business'}</strong>.
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Keep your phone line open. The simulated AI receptionist is connecting.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTriggerPhoneTest} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">Your Business Name</label>
                      <input
                        type="text"
                        required
                        value={testBusinessName}
                        onChange={(e) => setTestBusinessName(e.target.value)}
                        placeholder="e.g. Pacific Coast Dental"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Your Direct Phone Number (Canada/US)</label>
                      <input
                        type="tel"
                        required
                        value={testPhoneNumber}
                        onChange={(e) => setTestPhoneNumber(e.target.value)}
                        placeholder="+1 (604) 555-0192"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-xs transition-colors shadow-lg shadow-amber-600/20"
                    >
                      Call My Phone Now (Free Test)
                    </button>
                  </form>
                )}
              </div>

              {/* Tool 2: Free 5-Document Audit */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase">
                  <FileText className="w-4 h-4" />
                  <span>Enterprise Viral Hook</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {lang === 'fa' ? 'ممیزی رایگان ۵ سند سازمانی' : 'Free 5-Document Invariant & Health Check'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'fa'
                    ? 'پنج نمونه فاکتور یا قرارداد را برای اسکن بفرستید تا گزارش مغایرت‌های مالی و بندهای پرخطر حقوقی را بدون هزینه دریافت کنید.'
                    : 'Upload 5 sample invoices or MSAs. SunAI returns a complimentary audit showing duplicate line items, tax variances, and flagged clauses.'}
                </p>

                <div className="p-6 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center space-y-2">
                  <FileText className="w-8 h-8 text-blue-400 mx-auto" />
                  <div className="text-xs font-semibold text-white">Drop 5 Sample Invoices or NDAs Here</div>
                  <div className="text-[11px] text-slate-400">PDF, TIFF, or Scanned Images (Up to 25MB)</div>
                  <button 
                    onClick={onClose}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium"
                  >
                    Launch Free Audit Upload
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>🔒 Ephemeral Zero-Retention Isolation</span>
                  <span>Turnaround: Under 120 Seconds</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>SunAI Systems Creative Studio · High-Converting Ad Set</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            {lang === 'fa' ? 'بستن استودیو' : 'Close Studio'}
          </button>
        </div>

      </div>
    </div>
  );
};
