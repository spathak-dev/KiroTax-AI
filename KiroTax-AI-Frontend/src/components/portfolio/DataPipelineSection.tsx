'use client';

import React from 'react';
import { Database, ArrowRightLeft, Server, Layers } from 'lucide-react';

export function DataPipelineSection() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-800 rounded-full px-4 py-1.5 mb-6">
                        <Database size={14} className="text-blue-400" />
                        <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">
                            Financial Data Infrastructure
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        The Intelligence Layer for Finance
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Kiro AI acts as a unified intelligence middleware between your accounting software,
                        ERPs, banking systems, and tax platforms.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Left: Input Sources */}
                    <div className="flex flex-col gap-4 w-full md:w-64">
                        {['Accounting Software', 'ERP Systems', 'Banking Feeds'].map((item) => (
                            <div key={item} className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center text-slate-300 font-medium">
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Center: Kiro AI Engine */}
                    <div className="relative">
                        {/* Connecting Lines (Left) */}
                        <div className="absolute top-1/2 -left-16 w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 hidden md:block"></div>

                        <div className="w-64 h-64 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-sm flex flex-col items-center justify-center relative z-10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                            <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-[spin_10s_linear_infinite]"></div>
                            <Layers size={48} className="text-blue-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-1">Kiro AI</h3>
                            <p className="text-blue-300 text-sm">Processing Engine</p>
                        </div>

                        {/* Connecting Lines (Right) */}
                        <div className="absolute top-1/2 -right-16 w-16 h-0.5 bg-gradient-to-l from-transparent to-blue-500 hidden md:block"></div>
                    </div>

                    {/* Right: Output Targets */}
                    <div className="flex flex-col gap-4 w-full md:w-64">
                        {['Structured JSON', 'Audit-Ready Data', 'Tax Filings'].map((item) => (
                            <div key={item} className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-center text-slate-300 font-medium">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="inline-flex items-center gap-2 text-slate-400 text-sm bg-slate-800/50 px-6 py-3 rounded-full">
                        <Server size={16} /> Transforms unstructured financial documents into structured, audit-ready data.
                    </p>
                </div>
            </div>
        </section>
    );
}
