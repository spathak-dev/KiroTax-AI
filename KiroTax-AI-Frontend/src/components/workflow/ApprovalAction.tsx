'use client';

import React from 'react';
import { OCRData } from './OCRPreview';
import { ShieldCheck, XCircle } from 'lucide-react';

interface ApprovalActionProps {
    data: OCRData;
    onApprove: () => void;
    onReject: () => void;
}

export function ApprovalAction({ data, onApprove, onReject }: ApprovalActionProps) {
    return (
        <div className="card max-w-2xl mx-auto p-6 border-l-4 border-l-green-600">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        Step 4: Final Approval
                        <span className="text-xs font-normal bg-green-100 text-green-800 px-2 py-1 rounded-full">Senior CA</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Review verified data before accounting entry.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Total Value</p>
                    <p className="text-xl font-bold">{data.amount.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-500 block">Vendor</span>
                        <span className="font-medium">{data.vendorName}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 block">Invoice #</span>
                        <span className="font-medium">{data.invoiceNo}</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-500 block">Verification Status</span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                            <ShieldCheck size={14} /> Verified by Audit Team
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onApprove}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700"
                >
                    <ShieldCheck size={20} />
                    Approve & Post Entry
                </button>
                <button
                    onClick={onReject}
                    className="flex-1 bg-white border border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-md py-3 flex items-center justify-center gap-2"
                >
                    <XCircle size={20} />
                    Reject / Correction
                </button>
            </div>
        </div>
    );
}
