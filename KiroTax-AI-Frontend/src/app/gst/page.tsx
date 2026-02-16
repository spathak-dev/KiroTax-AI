'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import GSTSummaryCard from '@/components/ui/GSTSummaryCard'
import { Download, FileText } from 'lucide-react'
import api from '@/lib/api'
import { toast } from 'sonner'

export default function GSTPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async (reportType: string) => {
    setIsGenerating(true)
    try {
      const response = await api.post('/gst/generate', null, {
        params: { month, year, report_type: reportType }
      })
      toast.success(`${reportType} generated successfully!`)
    } catch (error) {
      toast.error('Failed to generate report')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GST Reports</h1>
          <p className="text-gray-600">Generate and download GST compliance reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(2024, m - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {[2024, 2023, 2022].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GSTSummaryCard
            title="GSTR-1"
            description="Outward supplies of taxable goods and/or services"
            onGenerate={() => handleGenerateReport('GSTR1')}
            isGenerating={isGenerating}
          />
          <GSTSummaryCard
            title="GSTR-3B"
            description="Summary return for payment of tax"
            onGenerate={() => handleGenerateReport('GSTR3B')}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
