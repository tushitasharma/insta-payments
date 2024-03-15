"use client";

import React from 'react';
import Link from 'next/link';
import '../styles/homePage.css';


const HomePage = () => {
    return (
      <div className='main-container'>
        <div className='inner-container'>
          <Link href="/checkout"><h1 className='main-heading'>Place Order</h1></Link>
        </div>
      </div>
    )
}

export default HomePage;