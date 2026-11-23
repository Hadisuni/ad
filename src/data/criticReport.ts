export interface KeywordItem {
  keyword: string;
  intent: 'Commercial' | 'Transactional' | 'Informational';
  volume: string;
  difficulty: 'Low' | 'Medium' | 'High';
  targetPage: string;
}

export interface FlawAndFix {
  id: string;
  area: string;
  title: string;
  titleFa: string;
  flaw: string;
  flawFa: string;
  impact: string;
  impactFa: string;
  fix: string;
  fixFa: string;
  status: 'Fixed in this build' | 'Action Item for Launch';
}

export interface IncorporationStep {
  phase: string;
  title: string;
  titleFa: string;
  tasks: { task: string; taskFa: string; completed?: boolean }[];
  deliverable: string;
}

export const CRITIC_FLAWS_AND_FIXES: FlawAndFix[] = [
  {
    id: 'flaw-1',
    area: 'Hero Value Proposition & Messaging',
    title: 'Vague "AI Document" Black Box vs Concrete Enterprise Outcome',
    titleFa: 'پیام گنگ «اسناد مبتنی بر هوش مصنوعی» در برابر ارزش شفاف سازمانی',
    flaw: 'Most early-stage B2B sites say "AI-powered document intelligence" without specifying what it solves, leading enterprise buyers (CFOs/COOs) to bounce in 5 seconds.',
    flawFa: 'اکثر وب‌سایت‌های نوپا عبارت‌های کلی مثل «هوش مصنوعی اسناد» می‌نویسند بدون اینکه بگویند چه مشکلی را حل می‌کنند. در نتیجه مدیران مالی و عملیاتی ظرف ۵ ثانیه صفحه را ترک می‌کنند.',
    impact: 'Zero lead qualification; prospects cannot determine if it handles AP invoices, legal contracts, or bill of lading.',
    impactFa: 'عدم جذب مشتری واجد شرایط؛ مشتری نمی‌داند آیا این سیستم فاکتور حسابداری را حل می‌کند یا قرارداد حقوقی را.',
    fix: 'State the exact capability: "Autonomous ingestion, 99.4% OCR extraction, and two-way sync with SAP, NetSuite, and QuickBooks in under 90 seconds."',
    fixFa: 'بیان خروجی دقیق: «استخراج خودکار اسناد با دقت ۹۹.۴٪ و ارسال آنی داده‌ها به SAP، NetSuite و نرم‌افزارهای حسابداری در کمتر از ۹۰ ثانیه» همراه با شبیه‌ساز زنده گردش کار.',
    status: 'Fixed in this build'
  },
  {
    id: 'flaw-2',
    area: 'Trust & Enterprise Procurement Readiness',
    title: 'Missing Security & Compliance Transparency (SOC 2, GDPR, SLA)',
    titleFa: 'نبود بخش شفاف امنیت و انطباق قانونی (SOC 2, GDPR, SLA)',
    flaw: 'Enterprises handling confidential contracts or financial records will NEVER upload documents to a site without clear data isolation and encryption policies.',
    flawFa: 'شرکت‌ها و سازمان‌ها هرگز اسناد محرمانه مالی و حقوقی خود را به سایتی که وضعیت رمزنگاری، حریم خصوصی داده‌ها و گواهی امنیتی‌اش مشخص نیست نمی‌سپارند.',
    impact: 'B2B deals stall at the procurement and IT security review stage.',
    impactFa: 'از دست رفتن قراردادها در مرحله بررسی امنیت اطلاعات و دپارتمان IT شرکت مشتری.',
    fix: 'Implemented dedicated Enterprise Trust Center detailing AES-256 at rest, TLS 1.3 in transit, zero-retention model training guarantees, and SOC 2 Type II roadmap.',
    fixFa: 'ایجاد مرکز امنیت سازمانی: تشریح رمزنگاری داده‌ها، عدم استفاده از اسناد مشتری برای آموزش مدل عمومی هوش مصنوعی، و تعهدنامه SLA با پایداری ۹۹.۹٪.',
    status: 'Fixed in this build'
  },
  {
    id: 'flaw-3',
    area: 'Conversion Architecture & Proof',
    title: 'Passive "Contact Us" Form instead of Interactive Value Validation',
    titleFa: 'فرم خشک «تماس با ما» به جای اثبات تعاملی ارزش و محاسبه بازگشت سرمایه',
    flaw: 'Static marketing pages with just an email form have <1.2% conversion. Enterprise prospects want immediate tangible proof of time and money saved.',
    flawFa: 'صفحات استاتیک فقط با فرم ایمیل، نرخ تبدیل زیر ۱.۲ درصد دارند. خریدار B2B می‌خواهد در لحظه بداند چقدر در زمان و هزینه تیمش صرفه‌جویی می‌شود.',
    impact: 'Low conversion rate (<1.2%) as prospects cannot estimate value or experience processing capability.',
    impactFa: 'نرخ تبدیل ناچیز (زیر ۱.۲٪) به دلیل عدم درک ارزش مالی و ملموس نبودن کارکرد سامانه برای خریدار.',
    fix: 'Built interactive Document Pipeline Simulator (real-time extraction parsing) + Interactive Enterprise ROI Calculator calculating annual saved FTE hours and dollars.',
    fixFa: 'پیاده‌سازی شبیه‌ساز واقعی پردازش سند (مشاهده لحظه‌ای استخراج JSON و تگ‌گذاری) به همراه ماشین حساب ROI جهت تخمین سودآوری سالانه.',
    status: 'Fixed in this build'
  },
  {
    id: 'flaw-4',
    area: 'Technical SEO & Search Architecture',
    title: 'Missing Programmatic Landing Strategy & Rich Schema Markup',
    titleFa: 'نبود استراتژی صفحات فرود تخصصی و ساختار Schema.org جهت رتبه گوگل',
    flaw: 'Single-page generic descriptions rank for zero search queries. Search engines need distinct intent clusters and structured data (SoftwareApplication, Organization, FAQ).',
    flawFa: 'صفحه اصلی به تنهایی نمی‌تواند در کلمات تخصصی رتبه اول شود؛ موتورهای جستجو نیازمند داده‌های ساخت‌یافته Schema.org و کلاستر موضوعی هستند.',
    impact: 'Zero organic enterprise search impressions; competitors dominate terms like invoice OCR and contract audit.',
    impactFa: 'از دست دادن ترافیک ارگانیک گوگل و تصاحب کلمات کلیدی درآمدزا توسط رقبای خارجی.',
    fix: 'Added full Schema.org JSON-LD graph, defined vertical-specific keyword matrix, and structured semantic HTML5 with zero-pill metadata hygiene.',
    fixFa: 'تزریق کامل کدهای JSON-LD اسکیما در Head، تعریف ماتریس کلمات کلیدی با جستجوی بالا، و ساختار سلسله‌مراتبی استاندارد سئو.',
    status: 'Fixed in this build'
  }
];

export const SEO_KEYWORD_STRATEGY: KeywordItem[] = [
  {
    keyword: 'enterprise document workflow automation',
    intent: 'Commercial',
    volume: '3,600/mo',
    difficulty: 'Medium',
    targetPage: 'Homepage (Core Landing)'
  },
  {
    keyword: 'automated invoice data extraction software',
    intent: 'Transactional',
    volume: '5,400/mo',
    difficulty: 'Medium',
    targetPage: '/solutions/accounts-payable'
  },
  {
    keyword: 'ai contract lifecycle management parser',
    intent: 'Commercial',
    volume: '2,900/mo',
    difficulty: 'Low',
    targetPage: '/solutions/legal-operations'
  },
  {
    keyword: 'intelligent document processing for sap erp',
    intent: 'Transactional',
    volume: '1,800/mo',
    difficulty: 'Low',
    targetPage: '/integrations/sap'
  },
  {
    keyword: 'automate internal document management workflows',
    intent: 'Commercial',
    volume: '2,200/mo',
    difficulty: 'Low',
    targetPage: 'Homepage & Core Features'
  },
  {
    keyword: 'ocr document extraction api for business',
    intent: 'Transactional',
    volume: '4,100/mo',
    difficulty: 'High',
    targetPage: '/developer/api'
  }
];

export const INCORPORATION_ROADMAP: IncorporationStep[] = [
  {
    phase: 'Step 1: Legal Entity & Jurisdiction',
    title: 'Corporate Incorporation (Delaware C-Corp / UK Ltd)',
    titleFa: 'ثبت شرکت حقوقی بین‌المللی (Delaware C-Corp یا UK Ltd)',
    deliverable: 'Certificate of Incorporation, Articles of Association & EIN',
    tasks: [
      {
        task: 'Select legal vehicle: Delaware C-Corp (recommended for US enterprise clients & venture capital) or UK Ltd (fast European B2B setup via Stripe Atlas or Clerky).',
        taskFa: 'انتخاب ساختار حقوقی: Delaware C-Corp (بهترین گزینه برای مشتریان شرکتی آمریکا و سرمایه‌گذاران) یا UK Ltd از طریق Stripe Atlas یا Firstbase.',
        completed: true
      },
      {
        task: 'Obtain Federal Employer Identification Number (FEIN/EIN) for corporate banking and tax filings.',
        taskFa: 'دریافت شماره مالیاتی فدرال (EIN) جهت افتتاح حساب بانکی شرکتی و ارائه فاکتور رسمی به مشتریان بین‌المللی.'
      },
      {
        task: 'Register SunAI Systems trademark and domain security lock for sunaisystems.com.',
        taskFa: 'ثبت برند تجاری SunAI Systems و فعال‌سازی قفل امنیتی دامنه sunaisystems.com.'
      }
    ]
  },
  {
    phase: 'Step 2: Corporate Banking & Global Payments',
    title: 'B2B Invoicing & ACH / Wire Settlement',
    titleFa: 'حساب بانکی شرکتی، دریافت پول و صدور پیش‌فاکتور (Invoicing)',
    deliverable: 'Mercury / Brex USD Account + Stripe Billing for Subscriptions',
    tasks: [
      {
        task: 'Open multi-currency business checking account (Mercury, Brex, or Wise Business) supporting ACH, SEPA, and SWIFT international wires.',
        taskFa: 'افتتاح حساب بانکی بین‌المللی شرکتی در Mercury یا Brex با پشتیبانی از حواله مستقیم بانکی، ACH و وایر ارزی.'
      },
      {
        task: 'Configure Stripe Billing & Custom Enterprise Invoicing with net-30 / net-60 terms for annual enterprise contracts.',
        taskFa: 'راه‌اندازی سیستم صورت‌حساب B2B با قابلیت پرداخت ۳۰ روزه یا ۶۰ روزه (Net-30 / Net-60) برای قراردادهای سالانه سازمانی.'
      }
    ]
  },
  {
    phase: 'Step 3: Enterprise Procurement & Sales Pack',
    title: 'Legal Contracts, SOC 2 Roadmap & Vendor Pack',
    titleFa: 'قراردادهای حقوقی سازمانی، فرم امنیتی و پکیج ورود تامین‌کننده (Vendor Onboarding)',
    deliverable: 'Standard MSA, DPA, SLA Guarantee, and Security Whitepaper',
    tasks: [
      {
        task: 'Master Services Agreement (MSA) with customer-friendly IP protection and mutual confidentiality.',
        taskFa: 'تدوین پیش‌نویس قرارداد خدمات سازمانی (MSA) با تضمین مالکیت فکری مشتری و توافق عدم افشا (NDA).'
      },
      {
        task: 'Data Processing Addendum (DPA) complying with GDPR and CCPA ensuring customer data is never used to train foundational models.',
        taskFa: 'الحاقیه پردازش داده‌ها (DPA) جهت تضمین عدم استفاده از اسناد محرمانه شرکت‌ها در آموزش هوش مصنوعی عمومی.'
      },
      {
        task: 'Formal 99.9% Service Level Agreement (SLA) with credit guarantees for enterprise downtime.',
        taskFa: 'تعهدنامه رسمی سطح کیفیت خدمات (SLA ۹۹.۹٪) با جبران خسارت شفاف در صورت اختلال.'
      },
      {
        task: 'Standard Vendor Security Assessment Questionnaire (SIG Lite / CAIQ) ready to answer Enterprise IT audits.',
        taskFa: 'آماده‌سازی پرسشنامه استاندارد امنیتی (SIG Lite) جهت پاسخ فوری به استعلام‌های تیم IT و امنیت سازمان‌ها.'
      }
    ]
  },
  {
    phase: 'Step 4: Go-to-Market & First 10 Enterprise Customers',
    title: 'Inbound SEO Funnel + High-Touch Outbound Pilot',
    titleFa: 'جذب ۱۰ مشتری اول سازمانی و پایلوت‌های پولی (Paid Pilots)',
    deliverable: '10 Paid Enterprise Pilots ($10k-$30k ACV each)',
    tasks: [
      {
        task: 'Launch vertical solutions pages (Logistics Bills of Lading, Healthcare HIPAA Records, Finance AP Invoices).',
        taskFa: 'انتشار صفحات اختصاصی بر اساس صنعت (اتوماسیون اسناد باربری و گمرک، مدیریت فاکتورهای مالی، پرونده‌های پزشکی).'
      },
      {
        task: 'Offer 14-day zero-risk "Proof of Concept" (POC) where SunAI parses 1,000 real company documents with side-by-side accuracy verification.',
        taskFa: 'ارائه پیشنهاد پایلوت ۱۴ روزه تست سند واقعی (پردازش ۱,۰۰۰ سند رایگان یا ارزان همراه با سنجش دقت در برابر نیروی انسانی).'
      },
      {
        task: 'Direct outreach to VPs of Finance, Operations Directors, and Digital Transformation Leaders on LinkedIn with personalized workflow audits.',
        taskFa: 'ارتباط مستقیم هدفمند با مدیران عملیات و روسای حسابداری شرکت‌ها و ارائه گزارش ارزیابی اتلاف زمان در پردازش دستی اسناد.'
      }
    ]
  }
];
