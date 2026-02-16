'use client';

import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function ComplianceSection() {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-green-700 text-xs font-bold uppercase mb-6">
                            <ShieldCheck size={14} /> Compliance Intelligence
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">
                            RAG-Based Regulatory Validation Engine
                        </h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Kiro AI uses Retrieval-Augmented Generation to validate every document against
                            live GST/VAT rules, deduction limits, and compliance manifests. It doesn't just
                            extract data; it legally validates it.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Real-time GSTIN/VAT validation against government portals",
                                "Automated HSN/SAC code consistency checks",
                                "TDS rate verification based on vendor thresholds",
                                "Input Tax Credit (ITC) eligibility flagging"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Visual */}
                    <div className="lg:w-1/2 relative perspective-1000">
                        {/* Abstract Document Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md mx-auto relative z-10 transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">Tax_Invoice_902.pdf</div>
                                        <div className="text-xs text-slate-500">Processing...</div>
                                    </div>
                                </div>
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Validating</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                                    <span className="text-sm text-slate-600">Vendor GSTIN</span>
                                    <div className="flex items-center gap-2 text-sm font-mono text-slate-900">
                                        27AABC...1ZM
                                        <CheckCircle2 size={14} className="text-green-500" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                                    <span className="text-sm text-slate-600">Tax Computation</span>
                                    <div className="flex items-center gap-2 text-sm font-mono text-slate-900">
                                        Mismatch Detected
                                        <AlertTriangle size={14} className="text-red-500" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                                    <span className="text-sm text-slate-600">Place of Supply</span>
                                    <div className="flex items-center gap-2 text-sm font-mono text-slate-900">
                                        Maharashtra (27)
                                        <CheckCircle2 size={14} className="text-green-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t text-xs text-slate-400 flex justify-between">
                                <span>Rule Engine v4.2</span>
                                <span>db_audit_log_8823</span>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute top-10 -right-10 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
