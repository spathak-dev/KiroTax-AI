'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import UploadBox from '@/components/ui/UploadBox'
import { toast } from 'sonner'
import api from '@/lib/api'

export default function UploadPage() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (files: File[]) => {
    setIsUploading(true)
    
    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        
        await api.post('/bills/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      
      toast.success(`${files.length} file(s) uploaded successfully!`)
      router.push('/bills')
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Bills</h1>
          <p className="text-gray-600">
            Upload invoices, bills, or receipts for AI-powered extraction
          </p>
        </div>

        <UploadBox onUpload={handleUpload} isUploading={isUploading} />

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Supported Formats</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• PDF documents (.pdf)</li>
            <li>• Images (JPG, PNG)</li>
            <li>• Maximum file size: 10MB</li>
            <li>• Multiple files can be uploaded at once</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
