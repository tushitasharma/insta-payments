"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchTheme } from '@/store/reducers/theme';
import { Provider } from 'react-redux';
import store from '@/store/store';
import '../styles/theme.css';

const ThemeUi = () => {
    const dispatch = useDispatch();
    const fetchThemeData = () => {
        dispatch(fetchTheme());
    };

    return (
        <button
            className='theme'
            onClick={fetchThemeData}
        >
            Change Theme
        </button>
    );
};

const Theme = () => {
    return (
        <Provider store={store}>
            <ThemeUi />
        </Provider>
    );
}

export default Theme;