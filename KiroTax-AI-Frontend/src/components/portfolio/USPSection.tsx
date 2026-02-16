'use client';

import React from 'react';
import { Zap, Brain, Lock, LayoutTemplate } from 'lucide-react';

const usps = [
    {
        icon: LayoutTemplate,
        title: "Template Intelligence",
        desc: "Vendor-aware detection & reusable library."
    },
    {
        icon: Brain,
        title: "Financial Forecasting AI",
        desc: "Predictive engine for profit/loss & cash flow."
    },
    {
        icon: Lock,
        title: "Enterprise RBAC",
        desc: "Bank-grade security & audit logs."
    },
    {
        icon: Zap,
        title: "Real-Time Pipeline",
        desc: "5x faster processing with 99% accuracy."
    }
];

export function USPSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">
                            What Makes Kiro AI Different?
                        </h2>
                        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                            Unlike generic OCR tools, Kiro AI is deeply aware of financial contexts.
                            It doesn't just read text; it understands vendors, tax laws, project codes,
                            and financial relationships.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {usps.map((usp, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1 bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <usp.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{usp.title}</h4>
                                        <p className="text-sm text-slate-500">{usp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain size={200} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Future-Ready Roadmap</h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'Continuous Learning Templates',
                                'Anomaly & Fraud Detection Signals',
                                'AI Financial Assistant (Chat)',
                                'Automated Advisory Insights'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                                        AI
                                    </span>
                                    <span className="font-medium text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
