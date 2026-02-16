import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    description: 'Perfect for small businesses',
    features: [
      '100 bills/month',
      'Basic OCR',
      'GST computation',
      'Email support',
      '1 user',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹2,999',
    period: '/month',
    description: 'For growing businesses',
    features: [
      '500 bills/month',
      'Advanced OCR + Templates',
      'GST automation',
      'Fraud detection',
      'Priority support',
      '5 users',
      'API access',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Unlimited bills',
      'Custom AI models',
      'Dedicated support',
      'SLA guarantee',
      'Unlimited users',
      'White-label option',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${
            plan.popular ? 'border-primary-600 relative' : 'border-gray-200'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-600 ml-1">{plan.period}</span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <Check size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/register"
            className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
              plan.popular
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  )
}
