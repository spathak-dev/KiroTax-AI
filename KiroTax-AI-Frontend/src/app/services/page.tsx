import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServicesSection from '@/components/home/ServicesSection'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI-powered solutions for all your GST and billing needs
            </p>
          </div>
          <ServicesSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
