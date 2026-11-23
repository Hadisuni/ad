import { AdPreset } from '../types/ads';

export const AD_PRESETS: AdPreset[] = [
  {
    id: 'preset-receptionist',
    labelEn: 'SunAI 24/7 AI Receptionist (Local SMBs)',
    labelFa: 'منشی هوش مصنوعی ۲۴/۷ برای کسب‌وکارهای محلی',
    campaign: {
      id: 'sunai-receptionist',
      brandName: 'SunAI Systems',
      tagline: '24/7 AI Phone Receptionist & Instant Booking',
      targetNiche: 'Local Businesses & Medical Clinics',
      targetAudience: 'Clinic Owners, Contractors, Realtors, Law Offices',
      region: 'Canada & United States',
      offer: 'Free 7-Day Zero-Risk Pilot on Your Existing Phone Number',
      tone: 'Urgent & High-Converting',
      language: 'en',
      squareImage: '/images/ad_smb_receptionist_square_1794454357509.jpg',
      squareImageAlt: 'Phone on a marble reception desk showing an incoming AI receptionist call and a confirmed appointment',
      verticalImage: '/images/ad_reels_phone_answering_1794454357907.jpg',
      verticalImageAlt: 'A woman at a desk at night beside a phone showing a confirmed client appointment, city lights behind',
      landscapeImage: '/images/ad_linkedin_enterprise_banner_1794454358791.jpg',
      landscapeImageAlt: 'A tablet on a wooden desk showing an automated document workflow, with a city skyline behind a glass wall',
      metaFeed: {
        hook: 'Every missed call is a lost $1,500 customer. 📞',
        body: 'When your front desk is busy or it is after 6:00 PM, 62% of callers hang up and immediately dial your nearest competitor. SunAI answers every incoming phone call with natural human voice clarity, answers pricing/service FAQs, and books appointments directly into your calendar.',
        bullets: [
          'Answers in under 2 rings with zero line-busy signals',
          'Instant calendar sync with Google, Outlook & Jane App',
          'Automated SMS confirmations with intake & location links',
          'Plans in CAD with no long-term contract lock-in'
        ],
        cta: 'Tap below to listen to a 60-second live voice demo on your phone!',
        hashtags: ['#AIReceptionist', '#SmallBusinessCanada', '#ClinicGrowth', '#DentalPractice', '#NoMissedCalls']
      },
      reelsStory: {
        hookSeconds: 'It was 10:42 PM on a Sunday...',
        storyScript: 'A client called to schedule a $3,200 procedure. Nobody was at the office. Nobody touched the desk phone. Yet the appointment was confirmed, notes were logged, and a confirmation text was dispatched. That is the power of SunAI 24/7 Voice Automation.',
        overlayBadge: '⚡ 10:42 PM: $3,200 Client Appointment Booked Automatically',
        audioSuggestion: 'Lo-Fi Ambient Executive Synth (Trending on Instagram)',
        ctaAction: 'Swipe Up / Test Live AI Call in 60s'
      },
      linkedinB2B: {
        headline: 'Eliminate front-desk bottlenecks without adding headcount.',
        problem: 'Local practices and service firms spend 30+ hours weekly answering repetitive phone calls while missing high-value new patient inquiries during peak hours.',
        solution: 'SunAI Voice Receptionist deploys on your existing phone line in 48 hours. It handles multi-line overflow, qualifies inbound intent, and synchronizes with your CRM.',
        proofPoints: [
          'Zero missed inbound inquiries during peak hours',
          'Full compliance: Zero audio training on client patient data',
          'Direct solutions engineer deployment'
        ],
        ctaButton: 'Schedule Live 15-Min Discovery'
      },
      googleSearch: {
        headline1: '24/7 AI Phone Receptionist',
        headline2: 'Never Miss a Customer Call',
        headline3: 'Plans in CAD · Free 7-Day Pilot',
        description1: 'Natural human voice AI receptionist answering customer calls, booking appointments, and following up via SMS 24/7.',
        description2: 'Trusted by Canadian clinics & contractors. Deploys on your phone in 48h. Listen to live voice demo.',
        displayPath: 'sunaisystems.com/ai-receptionist',
        sitelinks: [
          { title: 'Listen to Live Audio Demo', desc: 'Hear how naturally our AI talks in 60s.' },
          { title: 'Transparent Pricing (CAD)', desc: 'Affordable monthly plans with no setup fees.' },
          { title: 'Clinic & Medical Integration', desc: 'Syncs with Jane App, Cliniko & Google.' },
          { title: 'Contractor & Trade Booking', desc: 'Instant dispatch & service estimates.' }
        ]
      },
      coldOutreach: {
        subjectLine: 'Quick question regarding phone calls at {{company_name}}',
        openingLine: 'Hi {{first_name}}, I noticed your team manages a high volume of client appointments.',
        body: 'Quick question: what happens to prospective clients who call when your front desk is busy with patients or after 6:00 PM? We build custom 24/7 AI Voice Receptionists that answer calls naturally, answer client FAQs, and book appointments directly into your calendar without missing a single lead.',
        callToAction: 'Can I send you a 60-second audio recording showing how it sounds for a business like {{company_name}}?'
      }
    }
  },
  {
    id: 'preset-enterprise-document',
    labelEn: 'SunAI Enterprise Document & ERP Engine',
    labelFa: 'اتوماسیون اسناد سازمانی و اتصال به SAP/NetSuite',
    campaign: {
      id: 'sunai-enterprise',
      brandName: 'SunAI Systems',
      tagline: 'Autonomous Document Intelligence & ERP Ingestion',
      targetNiche: 'Supply Chain, Logistics & Mid-Market Finance',
      targetAudience: 'CFOs, Operations VPs, Controllers, Procurement Heads',
      region: 'North America & Global',
      offer: '14-Day Zero-Risk Proof of Concept (1,000 Documents Tested)',
      tone: 'Executive & Trustworthy',
      language: 'en',
      squareImage: '/images/ad_enterprise_invoice_square_1794454358889.jpg',
      squareImageAlt: 'A laptop showing an invoice being read, with data lines flowing to a glowing ERP integration panel',
      verticalImage: '/images/ad_reels_phone_answering_1794454357907.jpg',
      verticalImageAlt: 'A woman at a desk at night beside a phone showing a confirmed client appointment, city lights behind',
      landscapeImage: '/images/ad_linkedin_enterprise_banner_1794454358791.jpg',
      landscapeImageAlt: 'A tablet on a wooden desk showing an automated document workflow, with a city skyline behind a glass wall',
      metaFeed: {
        hook: 'Still paying operations staff to manually type supplier invoices into SAP? 📄➡️💻',
        body: 'Manual invoice data entry isn’t just slow—it creates reconciliation discrepancies, payment disputes, and audit risks. SunAI ingests complex multi-currency invoices, POs, and freight bills, performing automated 3-way matching in under 90 seconds.',
        bullets: [
          'Sub-minute processing turnaround from PDF to ERP posting',
          'Automated 3-way purchase order reconciliation',
          'Human-in-the-loop exception routing for ambiguous edge cases',
          'Bank-grade AES-256 encryption & strict Zero-Retention privacy'
        ],
        cta: 'Request your 14-day zero-risk enterprise proof of concept today.',
        hashtags: ['#AccountsPayable', '#EnterpriseAutomation', '#SAP', '#NetSuite', '#ProcurementTech']
      },
      reelsStory: {
        hookSeconds: 'How 1 enterprise eliminated 40 hours of manual invoice entry per week...',
        storyScript: 'Every month, 8,000 vendor invoices arrived in cluttered PDF attachments. Their accounting team was drowning in manual data entry. Today, SunAI parses the line items, verifies the PO numbers against SAP, and routes exceptions to a human reviewer in seconds.',
        overlayBadge: 'Verified: 8,000 Vendor Invoices Ingested with Zero Disruption',
        audioSuggestion: 'Deep Tech Minimalist Pulse',
        ctaAction: 'Book Technical CISO Briefing'
      },
      linkedinB2B: {
        headline: 'Automate multi-currency document extraction with zero model retention.',
        problem: 'Enterprise finance leaders spend hundreds of hours reconciling discrepancies between vendor invoices, packing lists, and ERP purchase orders.',
        solution: 'SunAI provides an autonomous document pipeline that connects directly to SAP S/4HANA, NetSuite, and QuickBooks with bi-directional ledger posting.',
        proofPoints: [
          'Direct ERP Webhook & SFTP connectors with zero consultant bloat',
          'Strict Zero-Retention Model Policy: client documents are never used for AI training',
          'Dedicated Enterprise Solutions Architect onboarding'
        ],
        ctaButton: 'Request 14-Day Enterprise Proof of Concept'
      },
      googleSearch: {
        headline1: 'Automate Invoice Ingestion in SAP',
        headline2: 'SunAI Document Intelligence Engine',
        headline3: 'Sub-90s Turnaround · SOC 2 Ready',
        description1: 'Extract complex multi-currency invoices, POs & contracts in under 90s. Native SAP S/4HANA & NetSuite integration with human-in-the-loop audit certainty.',
        description2: 'Replace legacy ABBYY/Kofax suites with an autonomous API pipeline. Zero model retention. Request 14-day POC.',
        displayPath: 'sunaisystems.com/document-workflow',
        sitelinks: [
          { title: 'Interactive Pipeline Sandbox', desc: 'Test live extraction with real invoices.' },
          { title: 'ROI & Hours-Saved Calculator', desc: 'Model your annual cost reduction in 2 mins.' },
          { title: 'Security & Compliance Whitepaper', desc: 'Download AES-256 & SOC 2 architecture kit.' },
          { title: 'Request Technical Discovery', desc: 'Direct briefing with senior workflow architect.' }
        ]
      },
      coldOutreach: {
        subjectLine: 'Automating invoice reconciliation at {{company_name}}',
        openingLine: 'Hi {{first_name}}, noticed {{company_name}} manages a high volume of vendor invoices and procurement orders.',
        body: 'Most finance teams we talk to lose 20+ hours weekly dealing with manual PO matching, currency conversions, and spreadsheet reconciliations. We deploy an autonomous document engine that ingests PDFs, performs 3-way matching against {{target_erp}}, and flags exceptions to your team in under 90 seconds—backed by strict zero-retention encryption.',
        callToAction: 'Would you be open to a 10-minute technical walkthrough with our lead architect next Tuesday?'
      }
    }
  },
  {
    id: 'preset-dental-clinic',
    labelEn: 'Dental & Cosmetic Clinic (Patient Intake & Booking)',
    labelFa: 'کلینیک دندان‌پزشکی و زیبایی (رزرو خودکار نوبت)',
    campaign: {
      id: 'clinic-ai',
      brandName: 'Apex Dental AI',
      tagline: 'Zero Missed Patient Calls, 24/7 Smart Booking',
      targetNiche: 'Dental, Orthodontic & Aesthetic Clinics',
      targetAudience: 'Clinic Directors, Practice Managers, Dentists',
      region: 'North America',
      offer: 'Free 14-Day Voice Trial for Your Clinic Phone Line',
      tone: 'Relatable & Viral',
      language: 'en',
      squareImage: '/images/ad_smb_receptionist_square_1794454357509.jpg',
      squareImageAlt: 'Phone on a marble reception desk showing an incoming AI receptionist call and a confirmed appointment',
      verticalImage: '/images/ad_reels_phone_answering_1794454357907.jpg',
      verticalImageAlt: 'A woman at a desk at night beside a phone showing a confirmed client appointment, city lights behind',
      landscapeImage: '/images/ad_linkedin_enterprise_banner_1794454358791.jpg',
      landscapeImageAlt: 'A tablet on a wooden desk showing an automated document workflow, with a city skyline behind a glass wall',
      metaFeed: {
        hook: 'A patient with a chipped tooth calls at 8:15 PM. Do they get your voicemail or an instant appointment? 🦷',
        body: 'In healthcare, urgency wins the patient. If you do not answer, they call the clinic down the street. Our 24/7 AI Voice Assistant answers patient questions about insurance, procedure pricing, and books appointments directly into your practice management software.',
        bullets: [
          'Answers after-hours emergency calls immediately',
          'Syncs with Dentrix, Curve Dental & Jane App',
          'Speaks English & French fluently with warm clinical tone',
          'Sends automated pre-op instructions via SMS'
        ],
        cta: 'Tap below to test the voice assistant live right now!',
        hashtags: ['#DentalPractice', '#ClinicMarketing', '#DentistGrowth', '#PatientIntake', '#HealthcareAI']
      },
      reelsStory: {
        hookSeconds: 'The #1 reason clinics lose $10,000+ every month...',
        storyScript: 'Your receptionist is checking in a patient while the phone rings twice. That caller hangs up. That was an Invisalign inquiry worth $4,500. With an AI voice receptionist, every single line is answered simultaneously.',
        overlayBadge: 'Zero Patient Calls Sent to Voicemail',
        audioSuggestion: 'Warm Upbeat Acoustic Chill',
        ctaAction: 'Test Dental Voice AI Free'
      },
      linkedinB2B: {
        headline: 'Modernize patient acquisition and phone triage for multi-location clinics.',
        problem: 'Staff burnout and high turnover at dental reception desks leads to dropped calls, patient dissatisfaction, and lost booking revenue.',
        solution: 'Deploy an automated AI voice agent trained on clinical FAQs, insurance policies, and scheduling logic.',
        proofPoints: [
          'Handles 10+ simultaneous incoming calls with zero wait time',
          'HIPAA-compliant data handling with zero audio retention',
          'Direct integration into scheduling workflows'
        ],
        ctaButton: 'Request Practice Growth Demo'
      },
      googleSearch: {
        headline1: 'Dental Clinic AI Receptionist',
        headline2: 'Never Miss a Patient Call',
        headline3: 'HIPAA Compliant · Free Trial',
        description1: 'Automate dental appointment booking and patient triage 24/7. Works on your existing phone line with Dentrix & Jane App.',
        description2: 'Eliminate missed calls and staff burnout. Warm, conversational human voice. Setup in 48 hours.',
        displayPath: 'apexdental.ai/receptionist',
        sitelinks: [
          { title: 'Interactive Phone Demo', desc: 'Call our sample clinic line right now.' },
          { title: 'Practice Management Sync', desc: 'Connects to Dentrix, Curve & Eaglesoft.' },
          { title: 'Transparent Monthly CAD Pricing', desc: 'Zero hardware costs, cancel anytime.' },
          { title: 'Clinic Case Studies', desc: 'See how Vancouver clinics grew 28% in 90 days.' }
        ]
      },
      coldOutreach: {
        subjectLine: 'After-hours patient booking for {{company_name}}',
        openingLine: 'Hi Dr. {{last_name}}, love the work your team does at {{company_name}}.',
        body: 'Quick question: what percentage of prospective dental patients who call after 6:00 PM or during lunch hours actually leave a voicemail versus calling the next clinic on Google? We set up conversational AI receptionists that answer clinical questions and book patients directly into your calendar 24/7.',
        callToAction: 'Can I send you a 45-second audio sample showing how it schedules a new patient intake?'
      }
    }
  }
];
