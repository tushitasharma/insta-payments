"use client";

import React from "react";
import { useSelector } from 'react-redux';
import '../styles/paymentPage.css';

const PaymentPage = () => {
    const { paymentMethods, products }= useSelector((state) => state.paymentStore);
    const [paymentOption, setPaymentOption] = React.useState(null);

    let total = 0;
    products.forEach((product) => {
        total += product.price * product.quantity;
    });

    const handlePaymentClick = () => {
        if (!paymentOption) return alert("Please select a payment method");
        alert("Order Placed Successfully!");
        window.location.href = '/';
    }

    return (
        <div className="main-container">
            <div className="inner-payment-container">
                <div className="payment-container">
                    <h2 className="main-heading">Payment</h2>
                    <h3>Choose Payment Method</h3>
                    <div className="method-container">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className="method-box">
                                <label htmlFor={index}>{method}</label>
                                <input type="radio" value={paymentOption} onChange={(e) => setPaymentOption(e)} name="payment" id={method.id} />
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