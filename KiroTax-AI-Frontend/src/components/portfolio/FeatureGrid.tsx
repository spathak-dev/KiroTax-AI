'use client';

import React from 'react';
import {
    FileText, PieChart, TrendingUp, Activity,
    ShieldCheck, LandPlot, Workflow, HardHat, Store, ScanLine
} from 'lucide-react';

const features = [
    {
        icon: FileText,
        title: "1. Intelligent Invoice & Document Processing",
        desc: "Enterprise Document AI Engine",
        color: "blue",
        points: [
            "AI OCR for 1000+ formats",
            "Line-item table extraction",
            "GST/VAT/TDS detection",
            "Multi-page & long-bill parsing",
            "ERP-ready structured outputs"
        ]
    },
    {
        icon: Store,
        title: "2. Vendor Intelligence System",
        desc: "Vendor Financial Profiles",
        color: "orange",
        points: [
            "Vendor GST validation",
            "Duplicate invoice detection",
            "Vendor risk scoring",
            "Payment cycle tracking",
            "Spend analytics"
        ]
    },
    {
        icon: HardHat,
        title: "3. Project & Construction Intelligence",
        desc: "Cost & Billing Engine",
        color: "amber",
        points: [
            "Contractor invoice tracking",
            "Milestone billing detection",
            "Cost vs Budget comparison",
            "Project ledger auto-generation",
            "Bill-of-quantity parsing"
        ]
    },
    {
        icon: LandPlot,
        title: "4. Balance Sheet & Financial Analysis",
        desc: "AI Financial Analyzer",
        color: "indigo",
        points: [
            "Automated ratio analysis",
            "Liquidity & profitability trends",
            "Working capital analysis",
            "Debt risk exposure",
            "Audit risk flags"
        ]
    },
    {
        icon: TrendingUp,
        title: "5. Predictive Financial Intelligence",
        desc: "Forecast & Risk Engine",
        color: "purple",
        points: [
            "Profit forecasting",
            "Loss probability detection",
            "Cash flow projections",
            "Revenue growth prediction",
            "Business valuation signals"
        ]
    },
    {
        icon: Activity,
        title: "6. Company & Stock Insights",
        desc: "AI-Market Intelligence",
        color: "emerald",
        points: [
            "Company financial strength score",
            "Growth probability",
            "Valuation insights",
            "Predictive trend signals"
        ]
    },
    {
        icon: PieChart,
        title: "7. Tax Intelligence & Compliance",
        desc: "Kiro AI Tax Assistant",
        color: "cyan",
        points: [
            "Automated tax liability estimation",
            "Compliance readiness checks",
            "Deduction insights",
            "Missing invoice alerts"
        ]
    },
    {
        icon: ShieldCheck,
        title: "8. Enterprise Security & Governance",
        desc: "Bank-Grade Security",
        color: "slate",
        points: [
            "Role-based access control",
            "Organization isolation",
            "Immutable audit logs",
            "Encrypted processing"
        ]
    },
    {
        icon: ScanLine,
        title: "9. Template Intelligence Engine",
        desc: "Self-Learning Parser",
        color: "rose",
        points: [
            "Auto template detection",
            "Layout-aware parsing",
            "Organization-specific templates",
            "Continuous learning models"
        ]
    },
    {
        icon: Workflow,
        title: "10. Workflow Automation",
        desc: "End-to-End Automation",
        color: "teal",
        points: [
            "Invoice → Ledger mapping",
            "Document → ERP sync",
            "Vendor → Payment mapping",
            "API integrations"
        ]
    }
];

export function FeatureGrid() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Enhanced Core Modules
                    </h2>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                        A comprehensive suite of 10+ AI modules for the modern finance stack.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group ${idx === 9 ? 'lg:col-start-2' : ''}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-${feature.color}-50 text-${feature.color}-600 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">
                                {feature.desc}
                            </p>

                            <ul className="space-y-3">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${feature.color}-400 flex-shrink-0`} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
