export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TAyWp1ygevVnfH',
    priceId: 'price_1SEcYyB93uMzjmp2yTxgmpv1',
    name: 'Ditch Plus Yearly',
    description: 'Annual subscription to Ditch Plus with full access to premium features',
    price: 25.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_TAyVPBf4QrGsqo',
    priceId: 'price_1SEcYZB93uMzjmp2ir1NcTD0',
    name: 'Ditch Plus',
    description: 'Monthly subscription to Ditch Plus with premium features',
    price: 2.99,
    currency: 'usd',
    mode: 'subscription'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};

export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};