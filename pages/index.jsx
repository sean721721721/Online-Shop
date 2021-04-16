import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

export default function Home () {
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