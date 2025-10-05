import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { StripeProduct, formatPrice } from '../stripe-config';
import { useStripe } from '../hooks/useStripe';
import { useAuth } from '../hooks/useAuth';

interface PricingCardProps {
  product: StripeProduct;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ product, isPopular = false }) => {
  const { createCheckoutSession, loading } = useStripe();
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    try {
      await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
      });
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const features = [
    'Advanced progress tracking',
    'Personalized insights',
    'Premium support',
    'Export data',
    'Custom goals',
  ];

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 ${isPopular ? 'ring-2 ring-cyan-500 scale-105' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-gray-600 ml-2">
            {product.mode === 'subscription' ? '/month' : '/year'}
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading || !user}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isPopular
            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Get ${product.name}`
        )}
      </button>

      {!user && (
        <p className="text-sm text-gray-500 text-center mt-3">
          Please sign in to subscribe
        </p>
      )}
    </div>
  );
};