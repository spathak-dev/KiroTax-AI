'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import { AnalyticsData } from '@/types';
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';

const mockAnalytics: AnalyticsData = {
    totalRevenue: 2500000,
    totalExpenses: 1200000,
    gstCollected: 450000,
    gstPaid: 216000,
    netProfit: 1300000,
    pendingApprovals: 3,
};

export default function OwnerDashboard() {
    const analytics = mockAnalytics;

    return (
        <RoleGuard allowedRoles={['OWNER']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
                        <p className="text-gray-600 mt-1">Complete overview of business operations</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        ₹{analytics.totalRevenue.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Expenses</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        ₹{analytics.totalExpenses.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <ArrowTrendingDownIcon className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Net Profit</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        ₹{analytics.netProfit.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <BanknotesIcon className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pending Approvals</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.pendingApprovals}</p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <ChartBarIcon className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">GST Summary</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-700">GST Collected</span>
                                    <span className="text-lg font-bold text-green-600">
                                        ₹{analytics.gstCollected.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                                    <span className="text-sm font-medium text-gray-700">GST Paid</span>
                                    <span className="text-lg font-bold text-red-600">
                                        ₹{analytics.gstPaid.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md border-2 border-blue-200">
                                    <span className="text-sm font-medium text-blue-900">Net GST Liability</span>
                                    <span className="text-lg font-bold text-blue-700">
                                        ₹{(analytics.gstCollected - analytics.gstPaid).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Ratios</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Profit Margin</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {((analytics.netProfit / analytics.totalRevenue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{
                                                width: `${(analytics.netProfit / analytics.totalRevenue) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Expense Ratio</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {((analytics.totalExpenses / analytics.totalRevenue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-red-600 h-2 rounded-full"
                                            style={{
                                                width: `${(analytics.totalExpenses / analytics.totalRevenue) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">GST Efficiency</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {((analytics.gstCollected / analytics.totalRevenue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{
                                                width: `${(analytics.gstCollected / analytics.totalRevenue) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {[
                                { action: 'Document approved', user: 'Senior CA', time: '2 hours ago' },
                                { action: 'New investment added', user: 'Investor', time: '5 hours ago' },
                                { action: 'Audit completed', user: 'Audit Team', time: '1 day ago' },
                                { action: 'Document uploaded', user: 'Article', time: '1 day ago' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RoleGuard>
    );
}
