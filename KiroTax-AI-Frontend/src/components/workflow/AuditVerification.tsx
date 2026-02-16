'use client';

import React, { useState } from 'react';
import { OCRData } from './OCRPreview';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AuditVerificationProps {
    data: OCRData;
    onVerify: (updatedData: OCRData) => void;
    onFlag: (reason: string) => void;
}

export function AuditVerification({ data, onVerify, onFlag }: AuditVerificationProps) {
    const [editedData, setEditedData] = useState<OCRData>(data);
    const [flagReason, setFlagReason] = useState('');
    const [isFlagging, setIsFlagging] = useState(false);

    const handleFieldChange = (field: keyof OCRData, value: string | number) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="card max-w-2xl mx-auto p-6 border-l-4 border-l-yellow-500">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                Step 3: Audit Verification
                <span className="text-xs font-normal bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Audit Mode</span>
            </h2>

            <div className="grid gap-4 mb-6">
                <div>
                    <label className="label">Vendor Name</label>
                    <input
                        type="text"
                        value={editedData.vendorName}
                        onChange={(e) => handleFieldChange('vendorName', e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Amount</label>
                        <input
                            type="number"
                            value={editedData.amount}
                            onChange={(e) => handleFieldChange('amount', parseFloat(e.target.value))}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="label">GSTIN</label>
                        <input
                            type="text"
                            value={editedData.gstIn}
                            onChange={(e) => handleFieldChange('gstIn', e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
            </div>

            {isFlagging ? (
                <div className="bg-red-50 p-4 rounded-md mb-4 animate-in fade-in">
                    <label className="label text-red-700">Reason for flagging:</label>
                    <textarea
                        value={flagReason}
                        onChange={(e) => setFlagReason(e.target.value)}
                        className="input-field min-h-[80px] border-red-300 focus:border-red-500 focus:ring-red-200"
                        placeholder="E.g., Ledger mismatch, missing stamp..."
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => onFlag(flagReason)}
                            disabled={!flagReason}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                        >
                            Confirm Flag
                        </button>
                        <button
                            onClick={() => setIsFlagging(false)}
                            className="text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-md text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button
                        onClick={() => onVerify(editedData)}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} />
                        Verify & Forward
                    </button>
                    <button
                        onClick={() => setIsFlagging(true)}
                        className="bg-red-100 text-red-700 px-6 py-2 rounded-md font-medium hover:bg-red-200 flex items-center gap-2 border border-red-200"
                    >
                        <AlertTriangle size={18} />
                        Flag Mismatch
                    </button>
                </div>
            )}
        </div>
    );
}
