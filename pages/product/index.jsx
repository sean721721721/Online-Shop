import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import TopBar from '../../components/ProductList/TopBar/TopBar';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { sliceProductsBy } from '../../lib/api';
import { AMOUNT_OF_SHOWING_PRODUCTS } from '../../lib/constants';

export default function Products ({ products }) {
  return (
    <React.Fragment>
      <TopBar/>
      <ProductList products={products}/>
    </React.Fragment>
  )
}

// export async function getStaticProps () {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const client = new ApolloClient({
//     uri: 'http://localhost:3000/graphql',
//     cache: new InMemoryCache()
//   });
//   const { data } = await client.query({
//     query: gql`
//     query getProduct {
//       listProduct(id:[]) {
//         id,
//         title,
//         price,
//         img,
//       }
//     }`
//   });

//   const slicedProduct = sliceProductsBy(data.listProduct, AMOUNT_OF_SHOWING_PRODUCTS);

//   return {
//     props: { products: slicedProduct }
//   }
// }