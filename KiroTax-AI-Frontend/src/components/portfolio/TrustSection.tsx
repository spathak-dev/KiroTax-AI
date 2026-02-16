'use client';

import React from 'react';
import { Users, Building, Briefcase, HardHat } from 'lucide-react';

const users = [
    {
        icon: Briefcase,
        title: "CA Firms",
        desc: "Client financial analysis, automated bookkeeping, audit support."
    },
    {
        icon: Building,
        title: "FinTech Platforms",
        desc: "Invoice APIs, financial analytics, compliance automation."
    },
    {
        icon: HardHat,
        title: "Construction & Infra",
        desc: "Project billing tracking, vendor cost monitoring."
    },
    {
        icon: Users,
        title: "Enterprises",
        desc: "Document digitization, vendor analytics, forecasting."
    }
];

export function TrustSection() {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Value Prop */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white mb-24 overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-12">Impact Metrics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6">
                                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">5x</div>
                                <div className="text-slate-400 font-medium">Faster Processing</div>
                            </div>
                            <div className="p-6 border-t md:border-t-0 md:border-l border-slate-800">
                                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">1000+</div>
                                <div className="text-slate-400 font-medium">Formats Supported</div>
                            </div>
                            <div className="p-6 border-t md:border-t-0 md:border-l border-slate-800">
                                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">80%</div>
                                <div className="text-slate-400 font-medium">Reduced Manual Entry</div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Target Users */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">Trusted By Industry Leaders</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {users.map((user, idx) => (
                        <div key={idx} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-700">
                                <user.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{user.title}</h3>
                            <p className="text-slate-600 text-sm">{user.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
