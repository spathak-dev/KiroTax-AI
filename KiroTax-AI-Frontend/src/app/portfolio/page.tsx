import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PortfolioSection from '@/components/home/PortfolioSection'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses across India are transforming their GST workflows with KiroTax AI
            </p>
          </div>
          <PortfolioSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
