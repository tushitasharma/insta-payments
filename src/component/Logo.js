"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from '@/store/store';
import '../styles/logo.css';

const LogoUi = () => {
    const { merchantName, merchantLogo, isLoading }= useSelector((state) => state.theme);

    if (isLoading) return null;

    return (
        <div className="logo-container">
            <img src={merchantLogo} alt="Merchant Logo" className="logo" />
            <h2>{merchantName}</h2>
        </div>
    );
};

const Logo = () => {
    return (
        <Provider store={store}>
            <LogoUi />
        </Provider>
    );
}

export default Logo;