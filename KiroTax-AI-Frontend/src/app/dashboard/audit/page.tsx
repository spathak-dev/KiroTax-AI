'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import OCRFieldsPanel from '@/components/OCRFieldsPanel';
import StatusBadge from '@/components/StatusBadge';
import { Document, OCRData } from '@/types';

// Mock data
const mockDocuments: Document[] = [
    {
        id: '1',
        fileName: 'invoice_001.pdf',
        fileUrl: '#',
        tag: 'purchase',
        status: 'pending',
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
    },
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
    },
];

export default function AuditDashboard() {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [editedData, setEditedData] = useState<OCRData | null>(null);
    const [auditNotes, setAuditNotes] = useState('');

    const handleSelectDocument = (doc: Document) => {
        setSelectedDoc(doc);
        setEditedData(doc.ocrData || null);
        setAuditNotes(doc.auditNotes || '');
    };

    const handleFlagMismatch = () => {
        if (selectedDoc) {
            const updated = documents.map((doc) =>
                doc.id === selectedDoc.id
                    ? { ...doc, status: 'flagged' as const, auditNotes }
                    : doc
            );
            setDocuments(updated);
            alert('Document flagged for review');
            setSelectedDoc(null);
        }
    };

    const handleApprove = () => {
        if (selectedDoc && editedData) {
            const updated = documents.map((doc) =>
                doc.id === selectedDoc.id
                    ? { ...doc, status: 'approved' as const, ocrData: editedData, auditNotes }
                    : doc
            );
            setDocuments(updated);
            alert('Document verified and sent for approval');
            setSelectedDoc(null);
        }
    };

    const handleFieldChange = (field: keyof OCRData, value: any) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: value });
        }
    };

    return (
        <RoleGuard allowedRoles={['AUDIT', 'OWNER']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Audit Dashboard</h1>
                        <p className="text-gray-600 mt-1">Verify and validate extracted document data</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <div className="card p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Verification</h3>
                                <div className="space-y-2">
                                    {documents.filter(d => d.status === 'pending').map((doc) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => handleSelectDocument(doc)}
                                            className={`w-full text-left p-3 rounded-md transition-colors ${selectedDoc?.id === doc.id
                                                ? 'bg-blue-50 border-2 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                }`}
                                        >
                                            <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                                            <p className="text-xs text-gray-500 mt-1 capitalize">{doc.tag}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            {selectedDoc && editedData ? (
                                <div className="space-y-4">
                                    <OCRFieldsPanel
                                        data={editedData}
                                        editable={true}
                                        onChange={handleFieldChange}
                                    />

                                    <div className="card p-6">
                                        <label className="label">Audit Notes</label>
                                        <textarea
                                            value={auditNotes}
                                            onChange={(e) => setAuditNotes(e.target.value)}
                                            rows={3}
                                            className="input-field"
                                            placeholder="Add any notes or observations..."
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button onClick={handleApprove} className="btn-primary flex-1">
                                            Verify & Send for Approval
                                        </button>
                                        <button onClick={handleFlagMismatch} className="btn-secondary flex-1">
                                            Flag Mismatch
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="card p-12 text-center">
                                    <p className="text-gray-500">Select a document to verify</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Documents</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {documents.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">{doc.fileName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{doc.ocrData?.vendorName || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {doc.ocrData ? `₹${doc.ocrData.amount.toLocaleString('en-IN')}` : '-'}
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
