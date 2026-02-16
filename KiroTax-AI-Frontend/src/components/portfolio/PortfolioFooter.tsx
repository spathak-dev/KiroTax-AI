'use client';

import React from 'react';

export function PortfolioFooter() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h3 className="text-white text-xl font-bold mb-1">Kiro AI</h3>
                    <p className="text-sm">FinTech Intelligence Platform</p>
                </div>

                <div className="flex gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Security</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                    <a href="/login" className="hover:text-white transition-colors text-blue-400">Login</a>
                </div>

                <div className="text-sm text-slate-600">
                    © {new Date().getFullYear()} KiroTax. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
