'use client';

import React from 'react';
import { Database, ArrowRight, Settings, FileSpreadsheet } from 'lucide-react';

export function ERPIntegration() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-3 py-1 text-indigo-300 text-xs font-bold uppercase mb-6">
                        <Database size={14} /> ERP Bridge
                    </div>
                    <h2 className="text-4xl font-bold mb-6">Manage Your Org Through Our ERP Engine</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Seamlessly map, transform, and push structured financial data to your existing ERPs.
                        Supports bulk operations, cross-system sync, and bidirectional data flow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                    {/* Step 1 */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-2xl relative">
                        <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            <FileSpreadsheet size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">1. Ingest</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Bulk upload from Excel, PDF, or API. Kiro auto-classifies and extracts data using template intelligence.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800/50 backdrop-blur border border-indigo-500/30 p-8 rounded-2xl relative shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            Transformation Core
                        </div>
                        <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                            <Settings size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">2. Map & Normalize</h3>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Field-level mapping rules normalize unstructured data into your ERP's schema (Tally, SAP, Oracle).
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-2xl relative">
                        <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <Database size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">3. Sync</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Push validated, audit-ready JSON/XML directly to your ERP or download standardized Excel reports.
                        </p>
                    </div>

                    {/* Connectors */}
                    <div className="hidden md:block absolute top-1/2 left-[30%] -translate-y-1/2 text-slate-600">
                        <ArrowRight size={32} />
                    </div>
                    <div className="hidden md:block absolute top-1/2 right-[30%] -translate-y-1/2 text-slate-600">
                        <ArrowRight size={32} />
                    </div>
                </div>
            </div>
        </section>
    );
}
