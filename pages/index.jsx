import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home (props) {
  console.log(props);
  useEffect(() => {
    const { pathname } = Router
    if (pathname === '/') {
      Router.push('/product')
    }
  });
  return (
    <div></div>
    // <h1 className="title">
    //   Read{' '}
    //   <Link href="/products">
    //     <a>this page!</a>
    //   </Link>
    // </h1>
  )
}

export async function getStaticProps () {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  const { data } = await client.query({
    query: gql`
    query getProduct {
      listProduct(id:[45], name_like:[]) {
        id,
        title,
      }
    }
    `
  });

  console.log(data)
  return {
    props: { data },
  }
}