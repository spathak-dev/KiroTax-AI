import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-govtech-orange/10 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              <span>AI for Viksit Bharat 🇮🇳</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Automate Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-govtech-orange to-govtech-green">
                GST & Billing
              </span>
              with AI
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Transform invoices into GST-ready reports in seconds. Built for Indian MSMEs, CAs, and Auditors.
              No manual data entry. No errors. Just intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg group"
              >
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold text-lg"
              >
                View Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-600" size={20} />
                <span className="text-sm text-gray-600">Bank-grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-600" size={20} />
                <span className="text-sm text-gray-600">99.9% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-sm font-medium text-gray-500">Invoice Processing</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      📄
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <div className="text-green-600 font-semibold">✓</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      🤖
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                    </div>
                    <div className="text-green-600 font-semibold">✓</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      📊
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-primary-200 rounded w-1/2 mb-2 animate-pulse"></div>
                      <div className="h-2 bg-primary-100 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="text-gray-400">⏳</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-semibold text-primary-600">2.3s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-primary-600">10K+</div>
              <div className="text-xs text-gray-600">Bills Processed</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">₹50Cr+</div>
              <div className="text-xs text-gray-600">GST Computed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
