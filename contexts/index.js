import { createContext, useContext } from 'react';
import { useQuery , gql } from '@apollo/client';
import {LIST_CART, LIST_PRODUCT, sliceProductsBy} from '../lib/api';
import { AMOUNT_OF_SHOWING_PRODUCTS } from '../lib/constants';

const AppContext = createContext();

export function AppWrapper ({ children }) {
  const { data: cartItems } = useQuery(LIST_CART);
  const { data: productItems } = useQuery(LIST_PRODUCT);
  console.log({ cartItems, productItems })

  return (
    <AppContext.Provider value={{ cartItems, productItems }}>
      {children}
    </AppContext.Provider>
  );
}

export function useCartContext () {
  if (!useContext(AppContext).cartItems) {
    return;
  }
  return useContext(AppContext).cartItems.listCart;
}

export function useProductContext () {
  const productItems = useContext(AppContext).productItems
  if (!productItems || !productItems.listProduct) return;
  const slicebProduct = sliceProductsBy(productItems.listProduct, AMOUNT_OF_SHOWING_PRODUCTS);
  return slicebProduct;
}
