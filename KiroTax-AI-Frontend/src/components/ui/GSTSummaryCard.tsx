import { FileCheck, Download } from 'lucide-react'

interface GSTSummaryCardProps {
  title: string
  description: string
  onGenerate: () => void
  isGenerating: boolean
}

export default function GSTSummaryCard({
  title,
  description,
  onGenerate,
  isGenerating,
}: GSTSummaryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <FileCheck className="text-green-600" size={24} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6">{description}</p>

      <div className="space-y-3">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </button>

        <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center">
          <Download size={20} className="mr-2" />
          Download Previous
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Last Generated</span>
          <span className="font-medium text-gray-900">15 Feb 2024</span>
        </div>
      </div>
    </div>
  )
}
