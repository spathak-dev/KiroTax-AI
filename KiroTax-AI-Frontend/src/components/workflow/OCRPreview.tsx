'use client';

import React from 'react';
import { FileText, Calendar, DollarSign, Hash, ShoppingBag } from 'lucide-react';

export interface OCRData {
    vendorName: string;
    gstIn: string;
    amount: number;
    date: string;
    invoiceNo: string;
    items: Array<{ name: string; qty: number; updated?: boolean }>;
}

interface OCRPreviewProps {
    data: OCRData;
    onNext: () => void;
}

export function OCRPreview({ data, onNext }: OCRPreviewProps) {
    return (
        <div className="card max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 p-1 rounded">Step 2:</span> OCR Extraction Results
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="label text-gray-500 text-xs uppercase tracking-wide">Vendor</label>
                        <p className="font-medium text-lg flex items-center gap-2">
                            <ShoppingBag size={16} className="text-gray-400" /> {data.vendorName}
                        </p>
                    </div>
                    <div>
                        <label className="label text-gray-500 text-xs uppercase tracking-wide">GSTIN</label>
                        <p className="font-mono text-gray-700">{data.gstIn}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label text-gray-500 text-xs uppercase tracking-wide">Invoice details</label>
                        <div className="flex flex-col gap-1">
                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <Hash size={14} /> {data.invoiceNo}
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={14} /> {data.date}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="label text-gray-500 text-xs uppercase tracking-wide">Total Amount</label>
                        <p className="text-2xl font-bold text-green-600 flex items-center">
                            <DollarSign size={20} /> {data.amount.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4 mb-6">
                <label className="label mb-2">Line Items</label>
                <ul className="space-y-2">
                    {data.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                            <span>{item.name}</span>
                            <span className="font-medium">Qty: {item.qty}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={onNext} className="btn-primary w-full">
                Send for Audit Verification
            </button>
        </div>
    );
}
