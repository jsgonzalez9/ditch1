import React from 'react';
import { PricingCard } from '../components/PricingCard';
import { STRIPE_PRODUCTS } from '../stripe-config';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock premium features to accelerate your journey to quit vaping
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {STRIPE_PRODUCTS.map((product, index) => (
            <PricingCard
              key={product.id}
              product={product}
              isPopular={index === 0} // Make yearly plan popular
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};