export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  category: 'Finance' | 'Legal' | 'HR' | 'Logistics';
  fileSize: string;
  pages: number;
  previewSnippet: string;
  extractedFields: { label: string; value: string; confidence: number; flagged?: boolean }[];
  validationRules: { name: string; status: 'passed' | 'warning' | 'review'; detail: string }[];
  targetSystem: string;
  syncPayload: Record<string, any>;
}

export const SAMPLE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-invoice',
    name: 'Apex_Global_Logistics_Inv_88410.pdf',
    type: 'Commercial Tax Invoice & PO',
    category: 'Finance',
    fileSize: '418 KB',
    pages: 2,
    previewSnippet: 'INVOICE #88410 — Apex Global Logistics Inc. Bill To: SunAI Client Corp. Terms: Net 30. Line 1: Cross-dock Freight Handling ($18,400.00). Line 2: Intermodal Rail Transit ($23,780.50). Total Due: $42,180.50.',
    extractedFields: [
      { label: 'Vendor Name', value: 'Apex Global Logistics Inc.', confidence: 99.9 },
      { label: 'Invoice Number', value: 'INV-88410-AG', confidence: 99.8 },
      { label: 'Issue Date', value: '2026-10-28', confidence: 99.5 },
      { label: 'Due Date', value: '2026-11-27 (Net 30)', confidence: 99.4 },
      { label: 'PO Reference', value: 'PO-2026-9021', confidence: 99.7 },
      { label: 'Subtotal Amount', value: '$42,180.50 USD', confidence: 99.8 },
      { label: 'Tax ID / VAT', value: 'US-84-9912042', confidence: 98.9 },
      { label: 'Payment Routing', value: 'ACH Wire: Chase 021000021', confidence: 99.2 }
    ],
    validationRules: [
      { name: '3-Way PO Matching', status: 'passed', detail: 'Line items match SAP Purchase Order #9021 within 0.00% variance.' },
      { name: 'Tax & Math Cross-Check', status: 'passed', detail: 'Line sum ($18,400 + $23,780.50) exactly equals invoice total.' },
      { name: 'Vendor Whitelist Check', status: 'passed', detail: 'Apex Global Logistics is active in vendor master database.' }
    ],
    targetSystem: 'SAP S/4HANA & NetSuite ERP',
    syncPayload: {
      event: 'INVOICE_AUTO_APPROVED',
      system: 'SAP_S4HANA_V2',
      vendor_id: 'VEND_8841',
      invoice_number: 'INV-88410-AG',
      amount_usd: 42180.5,
      gl_account: '6100-FREIGHT-EXPENSE',
      approval_tier: 'AUTO_AUTHORIZED_TIER_1',
      settlement_scheduled: '2026-11-27T00:00:00Z'
    }
  },
  {
    id: 'doc-contract',
    name: 'Horizon_Enterprise_SaaS_MSA_2026.pdf',
    type: 'Master Services Agreement & NDA',
    category: 'Legal',
    fileSize: '1.2 MB',
    pages: 14,
    previewSnippet: 'MASTER SERVICES AGREEMENT between Horizon Systems and Client. Clause 4.2: Data Ownership & Security. Clause 9.1: Mutual Indemnification limited to 12 months fees. Clause 14.3: Governing Law: State of Delaware.',
    extractedFields: [
      { label: 'Counterparty', value: 'Horizon Systems LLC', confidence: 99.8 },
      { label: 'Effective Date', value: '2026-11-01', confidence: 99.6 },
      { label: 'Term Length', value: '36 Months with Annual Renewal', confidence: 99.1 },
      { label: 'Liability Cap', value: '$2,500,000 USD (12x Monthly)', confidence: 98.7 },
      { label: 'Data Residency', value: 'US East & EU Frankfurt (GDPR)', confidence: 99.4 },
      { label: 'Termination Notice', value: '60 Days Written Prior Notice', confidence: 97.9, flagged: true },
      { label: 'Governing Law', value: 'State of Delaware, USA', confidence: 99.5 }
    ],
    validationRules: [
      { name: 'Indemnity Threshold', status: 'passed', detail: 'Liability cap within legal standard (< 2x contract value).' },
      { name: 'Non-Standard Notice Period', status: 'warning', detail: '60 days required instead of company standard 30 days. Flagged for legal review.' },
      { name: 'Data Processing Compliance', status: 'passed', detail: 'GDPR Clause 28 Standard Contractual Clauses present.' }
    ],
    targetSystem: 'Ironclad CLM & Salesforce CRM',
    syncPayload: {
      event: 'CONTRACT_REVIEW_ROUTED',
      system: 'IRONCLAD_API_V3',
      contract_id: 'CTR-2026-HORIZON',
      risk_score: 'LOW_RISK',
      human_review_required: true,
      flagged_clauses: ['Clause 14.2: 60-Day Termination Notice'],
      owner_email: 'legal.counsel@enterprise.com'
    }
  },
  {
    id: 'doc-bill-of-lading',
    name: 'Pacific_Maritime_Bill_of_Lading_8091.pdf',
    type: 'Ocean Freight Customs Bill of Lading',
    category: 'Logistics',
    fileSize: '890 KB',
    pages: 3,
    previewSnippet: 'PORT OF ENTRY: Long Beach, CA. Shipper: Ningbo Precision Components. Consignee: SunAI Distributed Warehouse. Cargo: 400 Cartons Automotive Sensor Relays. Harmonized Tariff: 8536.41.00.',
    extractedFields: [
      { label: 'Carrier Vessel', value: 'Ever Forward Voyage 044W', confidence: 99.7 },
      { label: 'Port of Loading', value: 'Ningbo-Zhoushan, CN', confidence: 99.8 },
      { label: 'Port of Discharge', value: 'Long Beach, CA, USA', confidence: 99.6 },
      { label: 'HTS Tariff Code', value: '8536.41.00 (Relays < 60V)', confidence: 98.9 },
      { label: 'Total Gross Weight', value: '14,280.00 KGS', confidence: 99.4 },
      { label: 'Customs Bond Number', value: 'BOND-99014-CA', confidence: 98.5 }
    ],
    validationRules: [
      { name: 'Customs Tariff Validation', status: 'passed', detail: 'HTS code verified against USITC 2026 tariff schedule.' },
      { name: 'Weight & Container Match', status: 'passed', detail: 'Gross weight matches terminal weighing ticket within 0.1%.' },
      { name: 'Sanctions / Entity Screening', status: 'passed', detail: 'Consignee and shipper cleared against OFAC SDN lists.' }
    ],
    targetSystem: 'Flexport & Descartes Customs Brokerage',
    syncPayload: {
      event: 'CUSTOMS_ENTRY_FILED',
      system: 'FLEXPORT_API',
      bol_number: 'BOL-8091-PAC',
      duty_estimated_usd: 1428.0,
      customs_status: 'RELEASE_AUTHORIZED'
    }
  }
];
