import { AlertCircle, Clock, FileX, TrendingDown } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: 'Manual Data Entry',
    description: 'Hours wasted typing invoice data manually into spreadsheets',
    stat: '40+ hrs/month',
  },
  {
    icon: FileX,
    title: 'Human Errors',
    description: 'Typos and calculation mistakes leading to GST filing errors',
    stat: '15-20% error rate',
  },
  {
    icon: TrendingDown,
    title: 'Compliance Delays',
    description: 'Missing deadlines due to slow processing and reconciliation',
    stat: '30% late filings',
  },
  {
    icon: AlertCircle,
    title: 'Fraud Detection',
    description: 'Fake invoices and duplicate GSTINs going unnoticed',
    stat: '₹1000Cr+ annual loss',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The MSME Pain Points
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Indian businesses lose millions in productivity and compliance penalties due to manual billing processes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition border border-gray-200"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <problem.icon className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {problem.description}
              </p>
              <div className="text-2xl font-bold text-red-600">
                {problem.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
