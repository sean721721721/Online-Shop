import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import TopBar from '../../components/ProductList/TopBar/TopBar';
import { AppProps } from 'next/app';

export default function Product ({ products }: AppProps) {
  return (
    <React.Fragment>
      <TopBar/>
      <ProductList products={products}/>
    </React.Fragment>
  )
}
