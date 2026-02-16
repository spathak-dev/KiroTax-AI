import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your GST Workflow?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Join 1000+ businesses automating their billing and GST compliance with AI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg group"
          >
            Start Free Trial
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition font-semibold text-lg"
          >
            Schedule Demo
          </Link>
        </div>
        <p className="text-primary-200 text-sm mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
