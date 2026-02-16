'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import CADashboard from '@/components/dashboard/CADashboard'
import ClientDashboard from '@/components/dashboard/ClientDashboard'
import AuditorDashboard from '@/components/dashboard/AuditorDashboard'

export default function DashboardPage({ params }: { params: { type: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user && user.role !== params.type) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, user, params.type, router])

  if (!user) return null

  const renderDashboard = () => {
    switch (params.type) {
      case 'admin':
        return <AdminDashboard />
      case 'ca':
        return <CADashboard />
      case 'client':
        return <ClientDashboard />
      case 'auditor':
        return <AuditorDashboard />
      default:
        return <div>Invalid dashboard type</div>
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
