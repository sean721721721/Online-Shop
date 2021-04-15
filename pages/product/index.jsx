import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import TopBar from '../../components/ProductList/TopBar/TopBar';

export default function Products () {
  return (
    <React.Fragment>
      <TopBar/>
      <ProductList/>
    </React.Fragment>
  )
}
