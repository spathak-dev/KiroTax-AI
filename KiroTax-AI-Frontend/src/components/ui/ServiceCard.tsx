import { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

export default function ServiceCard({ icon: Icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition border border-gray-200 group">
      <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition">
        <Icon className="text-primary-600 group-hover:text-white transition" size={28} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <Check size={16} className="text-green-600 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
