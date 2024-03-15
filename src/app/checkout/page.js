"use client";

import CheckoutPage from "@/component/CheckoutPage";
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function Home() {
  return (
    <Provider store={store}>
        <CheckoutPage />
    </Provider>
  );
}
