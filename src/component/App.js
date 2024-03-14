"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import HomePage from './HomePage';

const App = () => {
    return (
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
};

export default App;