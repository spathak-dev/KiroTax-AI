'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Calculator, 
  FileCheck, 
  Users, 
  Settings,
  Briefcase,
  TrendingUp
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', href: `/dashboard/${user?.role}` },
      { icon: Upload, label: 'Upload Bills', href: '/upload' },
      { icon: FileText, label: 'Bills', href: '/bills' },
      { icon: Calculator, label: 'GST Reports', href: '/gst' },
    ]

    const roleSpecificItems: Record<string, any[]> = {
      admin: [
        { icon: Users, label: 'Users', href: '/users' },
        { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
      ],
      ca: [
        { icon: FileCheck, label: 'Tax Filing', href: '/tax' },
        { icon: Briefcase, label: 'Clients', href: '/clients' },
      ],
      auditor: [
        { icon: FileCheck, label: 'Audit Trail', href: '/audit' },
      ],
    }

    return [
      ...commonItems,
      ...(user?.role ? roleSpecificItems[user.role] || [] : []),
      { icon: Settings, label: 'Settings', href: '/settings' },
    ]
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-govtech-orange to-govtech-green rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="text-xl font-bold text-gray-900">KiroTax AI</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {getMenuItems().map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition',
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-primary-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-1">Need Help?</p>
          <p className="text-xs text-gray-600 mb-3">Contact our support team</p>
          <button className="w-full bg-primary-600 text-white text-sm py-2 rounded-lg hover:bg-primary-700 transition">
            Get Support
          </button>
        </div>
      </div>
    </aside>
  )
}
