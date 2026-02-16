'use client'

import StatsCard from '@/components/ui/StatsCard'
import { FileCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export default function AuditorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Auditor Dashboard</h1>
        <p className="text-gray-600">Review and audit GST filings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Audits Completed" value={89} icon={CheckCircle} color="green" trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Pending Audits" value={15} icon={Clock} color="orange" />
        <StatsCard title="Issues Found" value={7} icon={AlertTriangle} color="red" />
        <StatsCard title="Compliance Rate" value="98.2%" icon={FileCheck} color="blue" />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Company {i} - GSTR-3B</p>
                <p className="text-sm text-gray-600">Submitted 2 days ago</p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
