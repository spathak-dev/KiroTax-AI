'use client'

import StatsCard from '@/components/ui/StatsCard'
import { Users, FileCheck, Clock, TrendingUp } from 'lucide-react'

export default function CADashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CA Dashboard</h1>
        <p className="text-gray-600">Manage your clients and their GST filings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Clients" value={24} icon={Users} color="blue" trend={{ value: 10, isPositive: true }} />
        <StatsCard title="Filings This Month" value={156} icon={FileCheck} color="green" trend={{ value: 15, isPositive: true }} />
        <StatsCard title="Pending Reviews" value={8} icon={Clock} color="orange" />
        <StatsCard title="Revenue" value="₹4.2L" icon={TrendingUp} color="purple" trend={{ value: 20, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Overview</h2>
          <div className="space-y-3">
            {['ABC Corp', 'XYZ Ltd', 'Tech Solutions'].map((client, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{client}</span>
                <span className="text-sm text-green-600">Up to date</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {['GSTR-1 Filing', 'GSTR-3B Filing', 'Annual Return'].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">{task}</span>
                <span className="text-sm text-orange-600">{3 - i} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
