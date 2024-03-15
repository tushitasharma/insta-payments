"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import '../styles/homePage.css';


const HomePage = () => {
  const { background, foreground }= useSelector((state) => state.theme);
    return (
      <div className='main-container' style={{backgroundColor: background}}>
        <div className='inner-container' style={{backgroundColor: foreground}}>
          <Link href="/checkout"><h1 className='main-heading'>Place Order</h1></Link>
        </div>
      </div>
    )
}

export default HomePage;