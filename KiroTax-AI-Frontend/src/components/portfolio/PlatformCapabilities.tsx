'use client';

import React from 'react';
import {
    ShieldCheck, FileText, BarChart3, Workflow, Database,
    Search, Lock, Zap, FileSpreadsheet, Layers,
    Users, Bell, Globe, Settings, FileCheck,
    RefreshCw, Briefcase, FileOutput, Server, Check
} from 'lucide-react';

const capabilities = [
    { icon: ShieldCheck, title: "1. Compliance Intelligence", desc: "RAG-Based Validation" },
    { icon: Zap, title: "2. AI Extraction Layer", desc: "Gemini Integration" },
    { icon: RefreshCw, title: "3. Data Mapper Engine", desc: "JSON/Excel Transformation" },
    { icon: Briefcase, title: "4. Tender Intelligence", desc: "Govt Procurement " },
    { icon: Workflow, title: "5. Workflow Automation", desc: "Multi-Level Approvals" },
    { icon: Bell, title: "6. Real-Time Notifications", desc: "SignalR Updates" },
    { icon: BarChart3, title: "7. Advanced Reporting", desc: "Enterprise Analytics" },
    { icon: Users, title: "8. Role-Based Dashboards", desc: "Custom Views" },
    { icon: FileSpreadsheet, title: "9. Template Marketplace", desc: "1000+ Formats" },
    { icon: FileCheck, title: "10. Audit Trail", desc: "Immutable Logs" },
    { icon: Layers, title: "11. Bulk Operations", desc: "Batch Processing" },
    { icon: FileOutput, title: "12. Document Generator", desc: "PDF/Excel Outputs" },
    { icon: RefreshCw, title: "13. Change Tracking", desc: "Version History" },
    { icon: Search, title: "14. Enterprise Search", desc: "Metadata Indexing" },
    { icon: Settings, title: "15. Config Engine", desc: "Org-Level Settings" },
    { icon: ShieldCheck, title: "16. Validation Framework", desc: "Error Handling" },
    { icon: Server, title: "17. Scalability Engine", desc: "Async Processing" },
    { icon: Globe, title: "18. Accessibility", desc: "WCAG Compliance" },
    { icon: Database, title: "19. Data Import/Export", desc: "ERP Sync" },
    { icon: Workflow, title: "20. Integration Support", desc: "API Endpoints" }
];

export function PlatformCapabilities() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Platform DNA</span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">
                        20 Enterprise Feature Domains
                    </h2>
                    <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                        Kiro AI is not just a tool; it's a complete financial operating system structured into
                        specialized domains covering the full lifecycle of financial data.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {capabilities.map((cap, idx) => (
                        <div
                            key={idx}
                            className="group p-4 rounded-xl border border-slate-100 hover:border-blue-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center cursor-default"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:border-blue-100 mb-3 transition-colors">
                                <cap.icon size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1 leading-tight">{cap.title}</h3>
                            <p className="text-xs text-slate-500 font-medium">{cap.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        </section>
    );
}
