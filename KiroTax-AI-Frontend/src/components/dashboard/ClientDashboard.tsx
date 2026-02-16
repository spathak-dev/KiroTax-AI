'use client'

import { useEffect, useState } from 'react'
import StatsCard from '@/components/ui/StatsCard'
import ChartComponent from '@/components/ui/ChartComponent'
import { FileText, Calculator, CheckCircle, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalBills: 0,
    processedBills: 0,
    gstComputed: 0,
    pendingReview: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/client')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your billing overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bills"
          value={stats.totalBills}
          icon={FileText}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Processed"
          value={stats.processedBills}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="GST Computed"
          value={`₹${(stats.gstComputed / 100000).toFixed(1)}L`}
          icon={Calculator}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Pending Review"
          value={stats.pendingReview}
          icon={AlertCircle}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Processing</h2>
          <ChartComponent type="line" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">GST Breakdown</h2>
          <ChartComponent type="pie" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Bills</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Invoice #{1000 + i}</p>
                  <p className="text-sm text-gray-600">Vendor ABC Pvt Ltd</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{(50000 + i * 10000).toLocaleString('en-IN')}</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Processed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
