'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import FileList from '@/components/ui/FileList'
import api from '@/lib/api'
import { toast } from 'sonner'

export default function BillsPage() {
  const [bills, setBills] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBills()
  }, [])

  const fetchBills = async () => {
    try {
      const response = await api.get('/bills')
      setBills(response.data)
    } catch (error) {
      toast.error('Failed to fetch bills')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (billId: string) => {
    try {
      await api.delete(`/bills/${billId}`)
      toast.success('Bill deleted successfully')
      fetchBills()
    } catch (error) {
      toast.error('Failed to delete bill')
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bills</h1>
            <p className="text-gray-600">View and manage your uploaded bills</p>
          </div>
          <a
            href="/upload"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Upload New
          </a>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bills...</p>
          </div>
        ) : (
          <FileList bills={bills} onDelete={handleDelete} />
        )}
      </div>
    </DashboardLayout>
  )
}
