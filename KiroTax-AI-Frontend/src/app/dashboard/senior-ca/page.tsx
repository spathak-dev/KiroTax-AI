'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import OCRFieldsPanel from '@/components/OCRFieldsPanel';
import StatusBadge from '@/components/StatusBadge';
import { Document } from '@/types';

const mockApprovedDocs: Document[] = [
    {
        id: '1',
        fileName: 'invoice_001.pdf',
        fileUrl: '#',
        tag: 'purchase',
        status: 'approved',
        uploadedBy: 'intern@kirotax.com',
        uploadedAt: '2026-02-13T10:00:00Z',
        ocrData: {
            vendorName: 'ABC Suppliers Ltd',
            gst: '27AABCU9603R1ZM',
            amount: 125000,
            date: '2026-02-10',
            invoiceNo: 'INV-2026-001',
            items: [
                { description: 'Office Supplies', quantity: 10, rate: 10000, amount: 100000 },
                { description: 'Stationery', quantity: 5, rate: 5000, amount: 25000 },
            ],
        },
        auditNotes: 'Verified all fields. GST number confirmed.',
    },
];

const mockPendingDocs: Document[] = [
    {
        id: '2',
        fileName: 'bill_002.pdf',
        fileUrl: '#',
        tag: 'expense',
        status: 'pending',
        uploadedBy: 'intern@kirotax.com',
        uploadedAt: '2026-02-12T14:30:00Z',
        ocrData: {
            vendorName: 'XYZ Services Pvt Ltd',
            gst: '29AABCT1332L1ZG',
            amount: 45000,
            date: '2026-02-11',
            invoiceNo: 'SRV-2026-045',
            items: [
                { description: 'Consulting Services', quantity: 1, rate: 45000, amount: 45000 },
            ],
        },
        auditNotes: 'Ready for final approval',
    },
];

export default function SeniorCADashboard() {
    const [pendingDocs, setPendingDocs] = useState<Document[]>(mockPendingDocs);
    const [approvedDocs, setApprovedDocs] = useState<Document[]>(mockApprovedDocs);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

    const handleApprove = (docId: string) => {
        const doc = pendingDocs.find((d) => d.id === docId);
        if (doc) {
            const approved = {
                ...doc,
                status: 'approved' as const,
                approvedBy: 'senior-ca@kirotax.com',
                approvedAt: new Date().toISOString(),
            };
            setPendingDocs(pendingDocs.filter((d) => d.id !== docId));
            setApprovedDocs([approved, ...approvedDocs]);
            alert('Document approved successfully');
            setSelectedDoc(null);
        }
    };

    const handleSendBack = (docId: string) => {
        const doc = pendingDocs.find((d) => d.id === docId);
        if (doc) {
            const flagged = { ...doc, status: 'flagged' as const };
            setPendingDocs(pendingDocs.map((d) => (d.id === docId ? flagged : d)));
            alert('Document sent back for correction');
            setSelectedDoc(null);
        }
    };

    return (
        <RoleGuard allowedRoles={['SENIOR_CA', 'OWNER']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Senior CA Dashboard</h1>
                        <p className="text-gray-600 mt-1">Review and approve verified documents</p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Pending Approval</p>
                            <p className="text-3xl font-bold text-amber-600 mt-2">{pendingDocs.length}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Approved Today</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">{approvedDocs.length}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Flagged</p>
                            <p className="text-3xl font-bold text-red-600 mt-2">
                                {pendingDocs.filter((d) => d.status === 'flagged').length}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Queue</h3>
                                <div className="space-y-2">
                                    {pendingDocs.map((doc) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => setSelectedDoc(doc)}
                                            className={`w-full text-left p-3 rounded-md transition-colors ${selectedDoc?.id === doc.id
                                                ? 'bg-blue-50 border-2 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                }`}
                                        >
                                            <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {doc.ocrData?.vendorName} • ₹{doc.ocrData?.amount.toLocaleString('en-IN')}
                                            </p>
                                        </button>
                                    ))}
                                    {pendingDocs.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-4">No pending approvals</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            {selectedDoc && selectedDoc.ocrData ? (
                                <div className="space-y-4">
                                    <OCRFieldsPanel data={selectedDoc.ocrData} editable={false} />

                                    {selectedDoc.auditNotes && (
                                        <div className="card p-6">
                                            <label className="label">Audit Notes</label>
                                            <p className="text-sm text-gray-700">{selectedDoc.auditNotes}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleApprove(selectedDoc.id)}
                                            className="btn-primary flex-1"
                                        >
                                            Approve Entry
                                        </button>
                                        <button
                                            onClick={() => handleSendBack(selectedDoc.id)}
                                            className="btn-secondary flex-1"
                                        >
                                            Send Back for Correction
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="card p-12 text-center">
                                    <p className="text-gray-500">Select a document to review</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Approved</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved At</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {approvedDocs.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">{doc.fileName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{doc.ocrData?.vendorName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                ₹{doc.ocrData?.amount.toLocaleString('en-IN')}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {doc.approvedAt ? new Date(doc.approvedAt).toLocaleString() : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={doc.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RoleGuard>
    );
}
