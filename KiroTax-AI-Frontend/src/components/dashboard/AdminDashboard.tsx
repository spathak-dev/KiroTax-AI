'use client'

import StatsCard from '@/components/ui/StatsCard'
import { Users, FileText, Activity, DollarSign } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and system metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value={1247} icon={Users} color="blue" trend={{ value: 18, isPositive: true }} />
        <StatsCard title="Bills Processed" value="52.3K" icon={FileText} color="green" trend={{ value: 25, isPositive: true }} />
        <StatsCard title="System Uptime" value="99.9%" icon={Activity} color="purple" />
        <StatsCard title="Revenue" value="₹12.5L" icon={DollarSign} color="orange" trend={{ value: 30, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Clients</span>
              <span className="font-semibold">856 (68.6%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CAs</span>
              <span className="font-semibold">312 (25.0%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auditors</span>
              <span className="font-semibold">79 (6.4%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>API Response Time</span>
              <span className="text-green-600 font-semibold">120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>OCR Accuracy</span>
              <span className="text-green-600 font-semibold">99.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Error Rate</span>
              <span className="text-green-600 font-semibold">0.02%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
