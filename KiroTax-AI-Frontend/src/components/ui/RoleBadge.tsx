import { UserRole } from '@/store/authStore'

interface RoleBadgeProps {
  role: UserRole
}

const roleConfig: Record<UserRole | string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'bg-purple-100 text-purple-700' },
  ca: { label: 'CA', color: 'bg-blue-100 text-blue-700' },
  client: { label: 'Client', color: 'bg-green-100 text-green-700' },
  auditor: { label: 'Auditor', color: 'bg-orange-100 text-orange-700' },
  owner: { label: 'Owner', color: 'bg-indigo-100 text-indigo-700' },
  practice_head: { label: 'Practice Head', color: 'bg-cyan-100 text-cyan-700' },
  senior_ca: { label: 'Senior CA', color: 'bg-blue-100 text-blue-700' },
  article: { label: 'Article', color: 'bg-yellow-100 text-yellow-700' },
  audit: { label: 'Audit', color: 'bg-red-100 text-red-700' },
  investor: { label: 'Investor', color: 'bg-emerald-100 text-emerald-700' },
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role]

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}
