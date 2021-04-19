import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_CART, LIST_PRODUCT } from '../lib/api';
import { sliceProductsBy } from '../lib/helper';
import { AMOUNT_OF_SHOWING_PRODUCTS } from '../lib/constants';
import { AppProps } from 'next/app';

const AppContext = createContext();

export function AppWrapper ({ children }: AppProps) {
  const { data: cartItems } = useQuery(LIST_CART);
  const { data: productItems } = useQuery(LIST_PRODUCT);
  if (!productItems || !cartItems) {
    return <div/>
  }
  return (
    <AppContext.Provider value={{ cartItems, productItems }}>
      {children}
    </AppContext.Provider>
  );
}

export function useCartContext () {
  if (!useContext(AppContext).cartItems) {
    return [];
  }
  return useContext(AppContext).cartItems.listCart;
}

export function useProductContext () {
  const productItems = useContext(AppContext).productItems
  if (!productItems || !productItems.listProduct) return [];
  const slicebProduct = sliceProductsBy(productItems.listProduct, AMOUNT_OF_SHOWING_PRODUCTS);
  return slicebProduct;
}
