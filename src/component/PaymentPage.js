"use client";

import React from "react";
import {  useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '@/store/reducers/paymentStore';
import '../styles/paymentPage.css';


const PaymentPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { paymentMethods, products }= useSelector((state) => state.paymentStore);
      const { background, foreground }= useSelector((state) => state.theme);
    const [paymentOption, setPaymentOption] = React.useState(null);

    let total = 0;
    products.forEach((product) => {
        total += product.price * product.quantity;
    });

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handlePaymentClick = () => {
        if (!paymentOption) return alert("Please select a payment method");

        const checkStatus = (Math.random() * 10);

        if (checkStatus > 2) return alert("Payment Failed! Please try again.");
        if (checkStatus > 1) return alert("Payment Pending! Please try again.");
        if (checkStatus > 0) {
            alert("Order Placed Successfully!");
            router.push('/')
        }
    }

    const handlePaymentOption = (method) => {
        setPaymentOption(method);
    }

    return (
        <div className="main-container" style={{backgroundColor: background}}>
            <div className="inner-payment-container" style={{backgroundColor: foreground}}>
                <div className="payment-container">
                    <h2 className="main-heading">Payment</h2>
                    <h3>Choose Payment Method</h3>
                    <div className="method-container">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className={paymentOption === method ? "method-box-active" : "method-box"} onClick={() => handlePaymentOption(method)}>
                                <label htmlFor={index}>{method}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
    `               <div className="total-container">
                        <p >TOTAL</p>
                        <h3 className="final-price">₹{total + 30}</h3>
                    </div>
                    <div className="payment-button" onClick={handlePaymentClick}>
                        Make a Payment
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage;