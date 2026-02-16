import PortfolioGrid from '@/components/ui/PortfolioGrid'

export default function PortfolioSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From MSMEs to large enterprises, see how KiroTax AI transforms billing workflows
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </section>
  )
}
