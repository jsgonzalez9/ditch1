import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import { IAP_PRODUCTS } from '../iap-config';

declare global {
  interface Window {
    store?: any;
  }
}

export const useIAP = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.store) {
      initializeStore();
    }
  }, []);

  const initializeStore = async () => {
    if (!window.store || initialized) return;

    const store = window.store;

    store.verbosity = store.DEBUG;

    IAP_PRODUCTS.forEach(product => {
      store.register({
        id: product.id,
        type: product.type,
      });
    });

    store.when('product').approved((p: any) => p.verify());
    store.when('product').verified((p: any) => p.finish());

    store.when('product').owned((product: any) => {
      if (product.id.includes('premium')) {
        handlePurchaseSuccess(product.id);
      }
    });

    store.when('product').updated((product: any) => {
      setProducts((prev) => {
        const index = prev.findIndex(p => p.id === product.id);
        if (index >= 0) {
          const newProducts = [...prev];
          newProducts[index] = product;
          return newProducts;
        }
        return [...prev, product];
      });
    });

    store.error((error: any) => {
      console.error('IAP Error:', error);
    });

    await store.refresh();
    setInitialized(true);
  };

  const handlePurchaseSuccess = async (productId: string) => {
    if (!user) return;

    const isYearly = productId.includes('yearly');
    const expiresAt = new Date();

    if (isYearly) {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const { error } = await supabase
      .from('subscriptions')
      .update({
        tier: 'premium',
        status: 'active',
        expires_at: expiresAt.toISOString(),
        platform: 'ios',
        product_id: productId,
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const purchaseProduct = async (productId: string) => {
    if (!window.store || !initialized) {
      console.error('Store not initialized');
      return;
    }

    setLoading(true);
    try {
      const product = window.store.get(productId);
      if (product) {
        window.store.order(productId);
      }
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setLoading(false);
    }
  };

  const restorePurchases = async () => {
    if (!window.store || !initialized) {
      console.error('Store not initialized');
      return;
    }

    setLoading(true);
    try {
      await window.store.refresh();
    } catch (error) {
      console.error('Restore error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = (productId: string) => {
    if (!window.store) return null;
    return window.store.get(productId);
  };

  return {
    purchaseProduct,
    restorePurchases,
    getProduct,
    products,
    loading,
    initialized,
  };
};
