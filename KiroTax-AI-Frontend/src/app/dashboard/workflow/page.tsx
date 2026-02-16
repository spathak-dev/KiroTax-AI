'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { DocumentUpload } from '@/components/workflow/DocumentUpload';
import { OCRPreview, OCRData } from '@/components/workflow/OCRPreview';
import { AuditVerification } from '@/components/workflow/AuditVerification';
import { ApprovalAction } from '@/components/workflow/ApprovalAction';
import { hasPermission } from '@/lib/permissions';

type WorkflowStep = 'UPLOAD' | 'OCR' | 'AUDIT' | 'APPROVAL' | 'COMPLETE';

export default function WorkflowPage() {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState<WorkflowStep>('UPLOAD');
    const [ocrData, setOcrData] = useState<OCRData | null>(null);

    // Mock initial OCR for demo purposes after upload
    const mockOCRProcess = (file: File) => {
        // Simulate processing delay
        setTimeout(() => {
            setOcrData({
                vendorName: "Tech Solutions Pvt Ltd",
                gstIn: "29AAAAA0000A1Z5",
                amount: 14500.00,
                date: new Date().toISOString().split('T')[0],
                invoiceNo: "INV-2024-001",
                items: [
                    { name: "Server Maintenance", qty: 1 },
                    { name: "Cloud Hosting", qty: 12 }
                ]
            });
            setCurrentStep('OCR');
        }, 1500);
    };

    const handleUpload = (file: File) => {
        console.log('Uploading:', file.name);
        // In real app, upload to server here
        mockOCRProcess(file);
    };

    const handleAuditVerify = (data: OCRData) => {
        setOcrData(data);
        setCurrentStep('APPROVAL');
    };

    const handleApproval = () => {
        alert("Invoice Approved and Posted to Accounting!");
        setCurrentStep('COMPLETE');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Document Processing Workflow</h1>

            {/* Step Indicator */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                {['UPLOAD', 'OCR', 'AUDIT', 'APPROVAL', 'COMPLETE'].map((step, idx) => (
                    <div key={step} className={`flex flex-col items-center gap-2 bg-white px-2`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === step ? 'bg-blue-600 text-white' :
                                ['UPLOAD', 'OCR', 'AUDIT', 'APPROVAL', 'COMPLETE'].indexOf(currentStep) > idx ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                            {idx + 1}
                        </div>
                        <span className="text-xs font-medium text-gray-500">{step}</span>
                    </div>
                ))}
            </div>

            {currentStep === 'UPLOAD' && (
                hasPermission(user.role, 'upload_documents') || user.role === 'OWNER' ? (
                    <DocumentUpload onUpload={handleUpload} />
                ) : (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <p className="text-red-500">You do not have permission to upload documents.</p>
                    </div>
                )
            )}

            {currentStep === 'OCR' && ocrData && (
                <OCRPreview
                    data={ocrData}
                    onNext={() => setCurrentStep('AUDIT')}
                />
            )}

            {currentStep === 'AUDIT' && ocrData && (
                hasPermission(user.role, 'upload_audit_docs') || user.role === 'OWNER' ? (
                    <AuditVerification
                        data={ocrData}
                        onVerify={handleAuditVerify}
                        onFlag={(reason) => alert(`Flagged: ${reason}`)}
                    />
                ) : (
                    <div className="card p-6 text-center">
                        <p className="text-yellow-600 mb-4">Waiting for Audit Team verification...</p>
                        <p className="text-sm text-gray-500">Current User Role: {user.role}</p>
                        {/* For demo purposes, allow skipping if stuck */}
                        <button onClick={() => setCurrentStep('APPROVAL')} className="underline text-xs mt-4">
                            [Demo Override: Skip to Approval]
                        </button>
                    </div>
                )
            )}

            {currentStep === 'APPROVAL' && ocrData && (
                hasPermission(user.role, 'approve_filing') || user.role === 'OWNER' ? (
                    <ApprovalAction
                        data={ocrData}
                        onApprove={handleApproval}
                        onReject={() => setCurrentStep('AUDIT')}
                    />
                ) : (
                    <div className="card p-6 text-center">
                        <p className="text-blue-600 mb-4">Waiting for Senior CA Approval...</p>
                        {/* For demo purposes, allow skipping */}
                        <button onClick={handleApproval} className="underline text-xs mt-4">
                            [Demo Override: Force Approve]
                        </button>
                    </div>
                )
            )}

            {currentStep === 'COMPLETE' && (
                <div className="card p-8 text-center bg-green-50 border-green-200">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Process Complete!</h2>
                    <p className="text-green-600">Data has been sent to Accounting, Tax, and Analytics modules.</p>
                    <button
                        onClick={() => {
                            setOcrData(null);
                            setCurrentStep('UPLOAD');
                        }}
                        className="btn-primary mt-6"
                    >
                        Process Another Document
                    </button>
                </div>
            )}
        </div>
    );
}
