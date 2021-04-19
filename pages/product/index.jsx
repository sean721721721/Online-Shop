import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import TopBar from '../../components/ProductList/TopBar/TopBar';

export default function Product ({ products }) {
  return (
    <React.Fragment>
      <TopBar/>
      <ProductList products={products}/>
    </React.Fragment>
  )
}