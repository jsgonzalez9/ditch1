export interface IAPProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'paid subscription' | 'non consumable';
}

export const IAP_PRODUCTS: IAPProduct[] = [
  {
    id: 'com.ditch.app.premium.yearly',
    name: 'Ditch Plus Yearly',
    description: 'Annual subscription to Ditch Plus with full access to premium features',
    price: 25.00,
    currency: 'usd',
    type: 'paid subscription'
  },
  {
    id: 'com.ditch.app.premium.monthly',
    name: 'Ditch Plus',
    description: 'Monthly subscription to Ditch Plus with premium features',
    price: 2.99,
    currency: 'usd',
    type: 'paid subscription'
  }
];

export const getProductById = (id: string): IAPProduct | undefined => {
  return IAP_PRODUCTS.find(product => product.id === id);
};

export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};