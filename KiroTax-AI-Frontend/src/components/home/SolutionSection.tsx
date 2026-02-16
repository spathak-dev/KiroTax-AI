import { Upload, Brain, FileCheck, Download } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Bills',
    description: 'Drag & drop invoices, bills, or receipts in any format (PDF, JPG, PNG)',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'AI Extraction',
    description: 'Our OCR engine extracts vendor, GSTIN, amounts, items, and tax details',
    color: 'purple',
  },
  {
    icon: FileCheck,
    title: 'Auto GST Compute',
    description: 'Automatically calculates CGST, SGST, IGST and validates against rules',
    color: 'green',
  },
  {
    icon: Download,
    title: 'Export Reports',
    description: 'Download GSTR-1, GSTR-3B, sales/purchase registers in Excel/JSON',
    color: 'orange',
  },
]

export default function SolutionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How KiroTax AI Solves It
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From invoice to GST filing in 4 simple steps. Powered by AI, built for India.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition border-2 border-gray-100 hover:border-primary-300">
                  <div className={`w-16 h-16 bg-${step.color}-100 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <step.icon className={`text-${step.color}-600`} size={32} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10x</div>
            <div className="text-gray-600">Faster Processing</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">₹50K+</div>
            <div className="text-gray-600">Saved per Month</div>
          </div>
        </div>
      </div>
    </section>
  )
}
