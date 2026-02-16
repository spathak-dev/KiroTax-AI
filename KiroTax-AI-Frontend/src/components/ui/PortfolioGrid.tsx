import { Building2, Factory, Store, Truck } from 'lucide-react'

const portfolioItems = [
  {
    icon: Building2,
    company: 'TechCorp Solutions',
    industry: 'IT Services',
    result: '80% faster GST filing',
    bills: '5000+ bills/month',
  },
  {
    icon: Factory,
    company: 'Manufacturing Co.',
    industry: 'Manufacturing',
    result: '₹2L saved annually',
    bills: '3000+ bills/month',
  },
  {
    icon: Store,
    company: 'Retail Chain',
    industry: 'Retail',
    result: '99.8% accuracy',
    bills: '10000+ bills/month',
  },
  {
    icon: Truck,
    company: 'Logistics Ltd.',
    industry: 'Logistics',
    result: 'Zero compliance delays',
    bills: '7000+ bills/month',
  },
]

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {portfolioItems.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition border border-gray-200"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <item.icon className="text-primary-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.company}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{item.industry}</p>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-green-600 font-semibold">{item.result}</span>
            </div>
            <div className="text-xs text-gray-600">{item.bills}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
