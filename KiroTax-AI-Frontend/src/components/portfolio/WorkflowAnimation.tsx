'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, ScanLine, FileText, Server, Laptop, CheckCircle, ArrowRight } from 'lucide-react';

export function WorkflowAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000); // 3 seconds per step
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-3xl mx-auto h-[450px] bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 flex items-center justify-center overflow-hidden perspective-1000 shadow-2xl">

            {/* Background Tech Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 transform rotate-x-12 scale-110"></div>

            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -z-10"></div>
            <div
                className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                style={{ width: `${(step + 1) * 25}%` }}
            ></div>

            {/* Step 1: Phone Scanning */}
            <div className={`absolute left-10 transition-all duration-700 transform ${step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className={`relative w-24 h-44 bg-slate-800 rounded-[2rem] border-4 ${step === 0 ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.4)]' : 'border-slate-700'} flex items-center justify-center overflow-hidden transition-all duration-500`}>
                    {/* Screen Content */}
                    <div className="absolute inset-2 bg-slate-900 rounded-[1.5rem] flex flex-col items-center justify-center overflow-hidden">
                        <ScanLine size={32} className={`text-blue-400 mb-2 ${step === 0 ? 'animate-pulse' : ''}`} />
                        <div className="w-12 h-1 bg-slate-700 rounded-full mb-1"></div>
                        <div className="w-8 h-1 bg-slate-700 rounded-full"></div>

                        {/* Scanning Beam */}
                        {step === 0 && (
                            <div className="absolute top-0 w-full h-1 bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-[scan_2s_linear_infinite]"></div>
                        )}
                    </div>
                    <div className="absolute top-0 w-1/3 h-4 bg-black rounded-b-xl"></div>
                </div>
                <div className={`mt-6 text-center transition-all ${step === 0 ? 'text-blue-400 scale-110 font-bold' : 'text-slate-500 font-medium'}`}>Scan Invoice</div>
            </div>

            {/* Step 2: OCR Processing */}
            <div className={`absolute left-[32%] transition-all duration-700 transform ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                <div className={`relative w-28 h-28 bg-slate-800 rounded-full border-2 ${step === 1 ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)]' : 'border-slate-700'} flex items-center justify-center z-10`}>
                    <Server size={40} className={`text-slate-400 ${step === 1 ? 'text-purple-400' : ''}`} />

                    {step === 1 && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                        </>
                    )}
                </div>
                <div className={`mt-6 text-center transition-all ${step === 1 ? 'text-purple-400 scale-110 font-bold' : 'text-slate-500 font-medium'}`}>AI Extraction</div>
            </div>

            {/* Step 3: Admin Audit */}
            <div className={`absolute right-[32%] transition-all duration-700 transform ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                <div className={`relative w-36 h-24 bg-slate-800 rounded-xl border-2 ${step === 2 ? 'border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]' : 'border-slate-700'} flex items-center justify-center transition-all duration-500`}>
                    {/* Laptop Screen */}
                    <div className="absolute inset-2 bg-slate-900 rounded flex flex-col items-center justify-center gap-1 border border-slate-700">
                        <div className="w-16 h-8 bg-slate-800 rounded border border-slate-700 grid grid-cols-2 gap-0.5 p-0.5">
                            <div className="bg-slate-600 rounded-[1px]"></div><div className="bg-slate-600 rounded-[1px]"></div>
                            <div className="bg-slate-600 rounded-[1px]"></div><div className="bg-slate-600 rounded-[1px]"></div>
                        </div>
                        {step === 2 && (
                            <div className="absolute bottom-2 flex gap-1">
                                <div className="w-6 h-2 bg-green-500/80 rounded-[1px] animate-pulse"></div>
                                <div className="w-6 h-2 bg-red-500/20 rounded-[1px]"></div>
                            </div>
                        )}
                    </div>

                    {step === 2 && (
                        <div className="absolute -top-3 -right-3 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce shadow-lg">
                            ACTION REQ
                        </div>
                    )}
                    {/* Laptop Base */}
                    <div className="absolute -bottom-1 w-[110%] h-2 bg-slate-700 rounded-b-lg"></div>
                </div>
                <div className={`mt-8 text-center transition-all ${step === 2 ? 'text-amber-400 scale-110 font-bold' : 'text-slate-500 font-medium'}`}>Admin Audit</div>
            </div>

            {/* Step 4: Approval */}
            <div className={`absolute right-10 transition-all duration-700 transform ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}>
                <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${step === 3 ? 'bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.6)]' : 'bg-slate-800 border-2 border-slate-700'}`}>
                    {step === 3 ? (
                        <CheckCircle size={48} className="text-white animate-[scale-in_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]" />
                    ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-600"></div>
                    )}
                </div>
                <div className={`mt-6 text-center transition-all ${step === 3 ? 'text-emerald-400 scale-110 font-bold' : 'text-slate-500 font-medium'}`}>Approved</div>
            </div>

            {/* Data Packets */}
            <div className="absolute top-1/2 left-0 w-full pointer-events-none h-4 -mt-2">
                {step === 0 && <div className="absolute left-20 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-[flow-right_0.8s_linear_infinite]"></div>}
                {step === 1 && <div className="absolute left-[40%] w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] animate-[flow-right_0.8s_linear_infinite]"></div>}
                {step === 2 && <div className="absolute left-[70%] w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24] animate-[flow-right_0.8s_linear_infinite]"></div>}
            </div>

        </div>
    );
}
