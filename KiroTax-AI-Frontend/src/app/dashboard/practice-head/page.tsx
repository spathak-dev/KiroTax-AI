'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import { ChartBarIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function PracticeHeadDashboard() {
    return (
        <RoleGuard allowedRoles={['PRACTICE_HEAD', 'OWNER']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Practice Head Dashboard</h1>
                        <p className="text-gray-600 mt-1">Oversee all client operations and approvals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Clients</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending Filings</p>
                                    <p className="text-3xl font-bold text-amber-600 mt-2">8</p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <ChartBarIcon className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Completed This Month</p>
                                    <p className="text-3xl font-bold text-green-600 mt-2">45</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Overview</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GST Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[
                                        { name: 'ABC Pvt Ltd', gst: '27AABCU9603R1ZM', docs: 12, status: 'Active' },
                                        { name: 'XYZ Industries', gst: '29AABCT1332L1ZG', docs: 8, status: 'Active' },
                                        { name: 'Tech Solutions', gst: '24AABCT1332L1ZG', docs: 15, status: 'Pending' },
                                    ].map((client, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{client.gst}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{client.docs}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`status-badge ${client.status === 'Active' ? 'status-approved' : 'status-pending'
                                                        }`}
                                                >
                                                    {client.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Senior CA Team', completed: 45, pending: 3 },
                                    { name: 'Audit Team', completed: 38, pending: 5 },
                                    { name: 'Article Team', completed: 52, pending: 2 },
                                ].map((team, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-md">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-900">{team.name}</span>
                                            <span className="text-xs text-gray-500">
                                                {team.completed} completed, {team.pending} pending
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{
                                                    width: `${(team.completed / (team.completed + team.pending)) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-700">Total Portfolio Value</span>
                                    <span className="text-lg font-bold text-blue-600">₹12,50,000</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-700">Active Investors</span>
                                    <span className="text-lg font-bold text-gray-900">6</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-700">YTD Returns</span>
                                    <span className="text-lg font-bold text-green-600">+12.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RoleGuard>
    );
}
