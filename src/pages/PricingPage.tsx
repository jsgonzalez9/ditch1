import React from 'react'
import { stripeProducts } from '../stripe-config'
import { SubscriptionCard } from '../components/subscription/SubscriptionCard'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock premium features to accelerate your journey to becoming vape-free
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stripeProducts.map((product, index) => (
            <SubscriptionCard
              key={product.priceId}
              product={product}
              isPopular={index === 0}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}