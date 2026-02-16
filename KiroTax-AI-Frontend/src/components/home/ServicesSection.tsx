import ServiceCard from '@/components/ui/ServiceCard'
import { FileText, Calculator, FileCheck, TrendingUp, Shield, Briefcase } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Bill OCR & Extraction',
    description: 'Extract data from invoices, bills, receipts using AI-powered OCR',
    features: ['Multi-format support', 'Table detection', 'Template learning'],
  },
  {
    icon: Calculator,
    title: 'GST Automation',
    description: 'Auto-compute CGST, SGST, IGST with validation and reconciliation',
    features: ['GSTR-1/3B generation', 'HSN/SAC mapping', 'ITC calculation'],
  },
  {
    icon: FileCheck,
    title: 'Tax Filing Assistant',
    description: 'Prepare and file returns with AI-powered compliance checks',
    features: ['Return preparation', 'Deadline alerts', 'Audit trail'],
  },
  {
    icon: TrendingUp,
    title: 'Tender Analysis',
    description: 'AI analysis of government tenders and bid requirements',
    features: ['Document parsing', 'Requirement extraction', 'Bid assistance'],
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    description: 'Detect fake invoices, duplicate GSTINs, and anomalies',
    features: ['GSTIN validation', 'Duplicate detection', 'Pattern analysis'],
  },
  {
    icon: Briefcase,
    title: 'Vendor Mapping',
    description: 'Intelligent vendor and GSTIN mapping with auto-suggestions',
    features: ['Vendor database', 'Smart matching', 'History tracking'],
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete GST Automation Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage billing, GST, and compliance in one platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
