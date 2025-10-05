import React, { useState } from 'react'
import { StripeProduct } from '../../stripe-config'
import { supabase } from '../../lib/supabase'
import { Check, Loader2 } from 'lucide-react'

interface SubscriptionCardProps {
  product: StripeProduct
  isPopular?: boolean
}

export function SubscriptionCard({ product, isPopular }: SubscriptionCardProps) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Failed to start checkout process. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = () => {
    if (product.mode === 'payment') {
      return `$${product.price.toFixed(2)} once`
    }
    return `$${product.price.toFixed(2)}/month`
  }

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 ${isPopular ? 'ring-2 ring-teal-500' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {formatPrice()}
        </div>
        {product.mode === 'payment' && (
          <p className="text-sm text-gray-500">One-time payment</p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-teal-500 mr-3" />
          <span className="text-gray-700">Advanced craving tracking</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-teal-500 mr-3" />
          <span className="text-gray-700">Detailed health insights</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-teal-500 mr-3" />
          <span className="text-gray-700">Personalized goals</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-teal-500 mr-3" />
          <span className="text-gray-700">Priority support</span>
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isPopular
            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </div>
        ) : (
          'Get Started'
        )}
      </button>
    </div>
  )
}