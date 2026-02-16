'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import UploadCard from '@/components/UploadCard';
import { DocumentTag, Document } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default function ArticleDashboard() {
    const [uploadedDocs, setUploadedDocs] = useState<Document[]>([]);

    const handleUpload = (file: File) => {
        const tag: DocumentTag = 'purchase'; // Default tag for now
        const newDoc: Document = {
            id: Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            tag,
            status: 'pending',
            uploadedBy: 'current-user',
            uploadedAt: new Date().toISOString(),
        };

        setUploadedDocs([newDoc, ...uploadedDocs]);
        alert('Document uploaded successfully!');
    };

    return (
        <RoleGuard allowedRoles={['ARTICLE', 'OWNER']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Article Dashboard</h1>
                        <p className="text-gray-600 mt-1">Upload and manage client documents</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <UploadCard onUpload={handleUpload} />

                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h3>
                            {uploadedDocs.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">No documents uploaded yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {uploadedDocs.slice(0, 5).map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{doc.fileName}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {doc.tag} • {new Date(doc.uploadedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <StatusBadge status={doc.status} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Uploaded Documents</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {uploadedDocs.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                                                No documents uploaded yet
                                            </td>
                                        </tr>
                                    ) : (
                                        uploadedDocs.map((doc) => (
                                            <tr key={doc.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900">{doc.fileName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{doc.tag}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(doc.uploadedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={doc.status} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RoleGuard>
    );
}
