'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RoleGuard from '@/components/RoleGuard';
import { InvestmentRecord } from '@/types';
import { PlusIcon } from '@heroicons/react/24/outline';

const mockInvestments: InvestmentRecord[] = [
    {
        id: '1',
        investorId: 'inv-001',
        date: '2026-02-01',
        type: 'Equity',
        amount: 500000,
        description: 'Tech Startup Investment',
    },
    {
        id: '2',
        investorId: 'inv-001',
        date: '2026-01-15',
        type: 'Mutual Fund',
        amount: 250000,
        description: 'Index Fund SIP',
    },
];

export default function InvestorDashboard() {
    const [investments, setInvestments] = useState<InvestmentRecord[]>(mockInvestments);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        date: '',
        type: '',
        amount: '',
        description: '',
    });

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

    const handleAddInvestment = (e: React.FormEvent) => {
        e.preventDefault();
        const investment: InvestmentRecord = {
            id: Math.random().toString(36).substr(2, 9),
            investorId: 'inv-001',
            date: newInvestment.date,
            type: newInvestment.type,
            amount: parseFloat(newInvestment.amount),
            description: newInvestment.description,
        };
        setInvestments([investment, ...investments]);
        setNewInvestment({ date: '', type: '', amount: '', description: '' });
        setShowAddForm(false);
        alert('Investment added successfully');
    };

    return (
        <RoleGuard allowedRoles={['INVESTOR', 'OWNER', 'PRACTICE_HEAD']}>
            <DashboardLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Investment Portfolio</h1>
                            <p className="text-gray-600 mt-1">Track and manage your investments</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add Investment
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Total Invested</p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                ₹{totalInvested.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Total Investments</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{investments.length}</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm text-gray-600">Current Value (Est.)</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                                ₹{(totalInvested * 1.12).toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>

                    {showAddForm && (
                        <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Investment</h3>
                            <form onSubmit={handleAddInvestment} className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newInvestment.date}
                                        onChange={(e) => setNewInvestment({ ...newInvestment, date: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="label">Type</label>
                                    <select
                                        required
                                        value={newInvestment.type}
                                        onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="">Select type</option>
                                        <option value="Equity">Equity</option>
                                        <option value="Mutual Fund">Mutual Fund</option>
                                        <option value="Fixed Deposit">Fixed Deposit</option>
                                        <option value="Bonds">Bonds</option>
                                        <option value="Real Estate">Real Estate</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Amount (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newInvestment.amount}
                                        onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                                        className="input-field"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="label">Description</label>
                                    <input
                                        type="text"
                                        required
                                        value={newInvestment.description}
                                        onChange={(e) => setNewInvestment({ ...newInvestment, description: e.target.value })}
                                        className="input-field"
                                        placeholder="Investment description"
                                    />
                                </div>
                                <div className="col-span-2 flex gap-3">
                                    <button type="submit" className="btn-primary flex-1">
                                        Add Investment
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="btn-secondary flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment History</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {investments.map((inv) => (
                                        <tr key={inv.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {new Date(inv.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{inv.type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{inv.description}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                ₹{inv.amount.toLocaleString('en-IN')}
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
