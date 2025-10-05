import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';

interface CheckoutOptions {
  id: string;
  mode: 'payment' | 'subscription';
}

export const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createCheckoutSession = async ({ id, mode }: CheckoutOptions) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          mode,
          userId: user.id,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUserSubscription = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return data;
  };

  return {
    createCheckoutSession,
    getUserSubscription,
    loading,
  };
};