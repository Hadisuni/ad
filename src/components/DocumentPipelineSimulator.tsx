import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  RefreshCw, 
  Database, 
  Send, 
  UploadCloud, 
  Code, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { SAMPLE_DOCUMENTS, DocumentItem } from '../data/sampleDocuments';

interface DocumentPipelineSimulatorProps {
  onOpenDemoModal: () => void;
  lang: 'en' | 'fa';
}

export const DocumentPipelineSimulator: React.FC<DocumentPipelineSimulatorProps> = ({ 
  onOpenDemoModal,
  lang 
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(SAMPLE_DOCUMENTS[0]);
  const [pipelineState, setPipelineState] = useState<'idle' | 'ingesting' | 'extracting' | 'validating' | 'synced'>('synced');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'fields' | 'rules' | 'json'>('fields');
  const [syncedCount, setSyncedCount] = useState<number>(14820);
  const [humanReviewFlagged, setHumanReviewFlagged] = useState<boolean>(false);

  const steps = [
    { id: 'ingest', labelEn: '1. Ingestion & Pre-processing', labelFa: '۱. بارگذاری و پیش‌پردازش OCR' },
    { id: 'extract', labelEn: '2. Multi-modal Extraction', labelFa: '۲. استخراج هوشمند موجودیت‌ها' },
    { id: 'validate', labelEn: '3. Business Rule Validation', labelFa: '۳. تطبیق قوانین مالی و حقوقی' },
    { id: 'sync', labelEn: '4. ERP Sync & Webhook Trigger', labelFa: '۴. ارسال آنی داده به ERP' },
  ];

  const runSimulation = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setHumanReviewFlagged(false);
    setPipelineState('ingesting');
    setCurrentStepIndex(0);

    setTimeout(() => {
      setPipelineState('extracting');
      setCurrentStepIndex(1);
    }, 700);

    setTimeout(() => {
      setPipelineState('validating');
      setCurrentStepIndex(2);
    }, 1500);

    setTimeout(() => {
      setPipelineState('synced');
      setCurrentStepIndex(3);
      setSyncedCount(prev => prev + 1);
    }, 2200);
  };

  return (
    <section id="pipeline-demo" className="py-20 bg-slate-900/50 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
            <Layers className="w-4 h-4" />
            <span>Interactive Workflow Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {lang === 'fa' 
              ? 'موتور هوشمند استخراج و اعتبارسنجی اسناد را زنده امتحان کنید' 
              : 'Experience the Autonomous Document Pipeline Live'}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {lang === 'fa'
              ? 'یکی از نمونه اسناد تجاری زیر (فاکتور حسابداری، قرارداد حقوقی، بارنامه دریایی) را انتخاب کنید و فرایند استخراج، خطایابی خودکار و اتصال به ERP را در زمان واقعی مشاهده فرمایید.'
              : 'Select a mission-critical enterprise document below. Watch SunAI ingest, structure, run cross-field compliance audits, and route clean payloads to ERP systems in milliseconds.'}
          </p>
        </div>

        {/* Document Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {SAMPLE_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => runSimulation(doc)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                selectedDoc.id === doc.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <FileText className={`w-4 h-4 ${selectedDoc.id === doc.id ? 'text-blue-400' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="font-semibold">{doc.name}</div>
                <div className="text-xs text-slate-400">{doc.type} · {doc.fileSize}</div>
              </div>
            </button>
          ))}

          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-slate-900/60 text-sm font-medium transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-blue-400" />
            <span>{lang === 'fa' ? 'تست سند اختصاصی شرکت شما...' : 'Upload Your Enterprise Sample...'}</span>
          </button>
        </div>

        {/* Pipeline Progress Visualizer */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-8 shadow-2xl backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {steps.map((st, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div 
                  key={st.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                      : isPast
                      ? 'bg-slate-900/80 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900/30 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium">
                      {lang === 'fa' ? st.labelFa : st.labelEn}
                    </span>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isCurrent && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isPast ? 'w-full bg-emerald-500' : isCurrent ? 'w-2/3 bg-blue-500' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Split Layout: Document Preview & Extracted Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simulated Document Paper View */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-white truncate max-w-[220px]">
                  {selectedDoc.name}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {selectedDoc.pages} Pages · Verified
              </span>
            </div>

            {/* Document "Paper" container */}
            <div className="flex-1 bg-white text-slate-900 rounded-xl p-6 shadow-inner font-mono text-xs overflow-y-auto leading-relaxed border border-slate-200">
              <div className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm tracking-tight">{selectedDoc.extractedFields[0]?.value || 'ENTERPRISE DOCUMENT'}</h3>
                  <div className="text-[10px] text-slate-500">Document Type: {selectedDoc.type}</div>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-700">
                  CONFIDENTIAL
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 mb-4 text-[11px] text-slate-700">
                {selectedDoc.previewSnippet}
              </div>

              <div className="space-y-2 pt-2 border-t border-dashed border-slate-300">
                <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                  Parsed Entity Sample:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>Ref: <span className="font-semibold text-slate-900">{selectedDoc.extractedFields[1]?.value}</span></div>
                  <div>Target: <span className="font-semibold text-slate-900">{selectedDoc.targetSystem}</span></div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
                <span>DIGITAL AUDIT TRAIL #99281-SUNAI</span>
                <span>STATUS: PARSED OK</span>
              </div>
            </div>

            {/* Re-run button */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => runSimulation(selectedDoc)}
                className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-run Extraction Engine</span>
              </button>

              <span className="text-xs font-mono text-emerald-400">
                Extraction Time: 1.28s
              </span>
            </div>
          </div>

          {/* Right Column: Intelligent Output Workspace */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[520px]">
            {/* Tab switch */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('fields')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'fields'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  Structured Fields ({selectedDoc.extractedFields.length})
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'rules'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  Validation Rules ({selectedDoc.validationRules.length})
                  {selectedDoc.validationRules.some(r => r.status === 'warning') && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'json'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  ERP Webhook JSON
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  Confidence: <span className="text-emerald-400 font-bold">99.4%</span>
                </span>
              </div>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeTab === 'fields' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDoc.extractedFields.map((field, fIdx) => (
                    <div 
                      key={fIdx}
                      className={`p-3 rounded-xl border text-xs ${
                        field.flagged
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                        <span>{field.label}</span>
                        <span className="font-mono text-emerald-400">{field.confidence}%</span>
                      </div>
                      <div className="font-semibold text-white break-words">
                        {field.value}
                      </div>
                      {field.flagged && (
                        <div className="mt-1 text-[10px] text-amber-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Non-standard clause flagged</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-3">
                  {selectedDoc.validationRules.map((rule, rIdx) => (
                    <div 
                      key={rIdx}
                      className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                        rule.status === 'passed'
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                          : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
                      }`}
                    >
                      {rule.status === 'passed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-white mb-0.5">{rule.name}</div>
                        <div className="text-slate-300 text-[11px]">{rule.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'json' && (
                <pre className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  {JSON.stringify(selectedDoc.syncPayload, null, 2)}
                </pre>
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Destination: <strong className="text-white">{selectedDoc.targetSystem}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHumanReviewFlagged(true)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    humanReviewFlagged
                      ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                      : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {humanReviewFlagged ? 'Flagged for Human In Loop' : 'Flag Exception'}
                </button>

                <button
                  onClick={onOpenDemoModal}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Connect Your ERP Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Real-time stats strip */}
        <div className="mt-10 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center text-xs">
          <div>
            <div className="text-slate-400">Total Ingested in Demo Session</div>
            <div className="text-lg font-bold font-mono text-white tabular-nums mt-0.5">{syncedCount.toLocaleString()} docs</div>
          </div>
          <div>
            <div className="text-slate-400">Field Extraction Accuracy</div>
            <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums mt-0.5">99.4% SLA</div>
          </div>
          <div>
            <div className="text-slate-400">Average Processing Speed</div>
            <div className="text-lg font-bold font-mono text-white tabular-nums mt-0.5">1.28 Seconds</div>
          </div>
          <div>
            <div className="text-slate-400">Supported Enterprise ERPs</div>
            <div className="text-lg font-bold font-mono text-blue-400 tabular-nums mt-0.5">SAP · NetSuite · QuickBooks</div>
          </div>
        </div>
      </div>
    </section>
  );
};
