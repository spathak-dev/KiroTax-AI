'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { WorkflowAnimation } from './WorkflowAnimation';

export function PortfolioHero() {
    return (
        <section className="relative overflow-hidden bg-slate-900 pt-20 pb-32 lg:pt-32 lg:pb-48 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-5xl mx-auto perspective-1000">
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-5 py-1.5 mb-8 shadow-sm animate-fade-in-up backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-blue-200 tracking-widest uppercase">
                            Enterprise Financial Intelligence • Ver 2.0
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
                            Enterprise Financial
                        </span>
                        <br />
                        Intelligence Platform
                    </h1>

                    <p className="mt-6 text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The modular operating system for modern finance teams. <br className="hidden md:block" />
                        Combines <span className="text-blue-400 font-bold">Document AI</span>,
                        <span className="text-blue-400 font-bold"> Compliance Automation</span>, and
                        <span className="text-blue-400 font-bold"> Predictive Analytics</span> into a unified workflow.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
                        <Link
                            href="/login"
                            className="group inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-500 transition-all hover:translate-y-[-2px] shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                        >
                            Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="group inline-flex items-center justify-center gap-3 bg-transparent text-white border border-slate-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all hover:border-slate-500">
                            Schedule Demo
                        </button>
                    </div>

                    {/* 3D Workflow Animation */}
                    <div className="relative mx-auto max-w-5xl transform hover:scale-[1.02] transition-transform duration-700 ease-out z-20">
                        <WorkflowAnimation />

                        {/* Glow Overlay */}
                        <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] -z-10 rounded-[3rem]"></div>
                    </div>

                </div>
            </div>

            {/* Background Deep Tech Grid */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none bg-[#0f172a]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen"></div>
            </div>
        </section>
    );
}
