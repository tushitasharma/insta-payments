"use client";

import React from "react";
import { useSelector } from 'react-redux';

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
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', color: 'black'}}>
            <div style={{width: '60vh', height: '80vh', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'scroll', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>Payment</h2>
                    <h4 style={{fontWeight: 'bold'}}>Choose Payment Method</h4>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        {paymentMethods.map((method, index) => (
                            <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '0.1rem solid #ccc', borderRadius: '0.5rem'}}>
                                <label htmlFor={index}>{method}</label>
                                <input type="radio" value={paymentOption} onChange={(e) => setPaymentOption(e)} name="payment" id={method.id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
    `               <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Total</h3>
                        <p>₹{total + 30}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'purple', padding: '0.5rem 1rem', alignItems: 'center', height: '2rem', marginTop: '1rem'}} onClick={handlePaymentClick}>
                        Make a Payment
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage;