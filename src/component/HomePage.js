"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import { fetchProducts } from '@/store/reducers/paymentStore';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, paymentMethods }= useSelector((state) => state.paymentStore);

  console.log('products', products, isLoading, paymentMethods);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);
    return (
      <div style={{display: 'flex', height: '100vh', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{backgroundColor: 'purple', padding: '5rem 10rem'}}>
          <Link href="/checkout"><h1 style={{border: '0.1rem solid blue', padding: '1rem', color: 'red'}}>Place Order</h1></Link>
        </div>
      </div>
    )
}

export default HomePage;