import React, { useEffect, useState } from 'react';
import { Crown, Loader2 } from 'lucide-react';
import { useStripe } from '../hooks/useStripe';
import { getProductByPriceId } from '../stripe-config';

export const SubscriptionStatus: React.FC = () => {
  const { getUserSubscription } = useStripe();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const sub = await getUserSubscription();
        setSubscription(sub);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [getUserSubscription]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <span className="text-sm">Free Plan</span>
      </div>
    );
  }

  const product = getProductByPriceId(subscription.price_id);
  const planName = product?.name || 'Premium Plan';

  return (
    <div className="flex items-center space-x-2">
      <Crown className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-gray-900">{planName}</span>
    </div>
  );
};