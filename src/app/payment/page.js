"use client";

import PaymentPage from "@/component/PaymentPage";
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function Home() {
  return (
    <Provider store={store}>
        <PaymentPage />
    </Provider>
  );
}
