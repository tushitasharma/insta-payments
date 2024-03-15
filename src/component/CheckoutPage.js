"use client";

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { fetchProducts } from '@/store/reducers/paymentStore';
import '../styles/checkoutPage.css';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { products, isLoading, isError }= useSelector((state) => state.paymentStore);
    const { background, foreground }= useSelector((state) => state.theme);
    const [discount, setDiscount] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [totalAmount, setTotalAmount] = React.useState({
        total: 0,
        deliveryFee: 30,
        discount: 0,
    });

    React.useEffect(() => {
        let total = 0;
        products.forEach((product) => {
            total += product.price * product.quantity;
        });
        setTotalAmount((prev) => ({
            ...prev,
            total,
        }));
    }, [products])
    
    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleDiscount = () => {
        if (discount) {
            setTotalAmount((prev) => ({
                ...prev,
                discount: 20,
            }));
        } else {
            setTotalAmount((prev) => ({
                ...prev,
                discount: 0,
            }));
        
        }
    }

    const handlePhoneNumberChange = (e) => {
        const newNumber = e.target.value;
        const regExp = /[a-zA-Z]/g;

        if (newNumber.length > 10) return;
        if (regExp.test(newNumber)) return;

        setPhoneNumber(newNumber)
    }

    const handlePaymentClick = () => {
        if (!phoneNumber) return alert("Please enter a valid phone number");
        if (phoneNumber.length < 10) return alert("Please enter a valid phone number");

        router.push('/payment');
    }

    if (isLoading) return (
        <div className="main-container">
            <div className="inner-checkout-container">
                Loading...
                <i class="ph ph-spinner"></i>
            </div>
        </div>
    );

    if (isError) return (
        <div className="main-container" style={{backgroundColor: background}}>
            <div className="inner-checkout-container secondary-page" style={{backgroundColor: foreground}}>
                Something went wrong, please try again later.
            </div>
        </div>
    );

    if (products.length === 0) return (
        <div className="main-container" style={{backgroundColor: background}}>
            <div className="inner-checkout-container secondary-page" style={{backgroundColor: foreground}}>
                No Product Found
            </div>
        </div>
    );

    return (
        <div className="main-container" style={{backgroundColor: background}}>
            <div className="inner-checkout-container" style={{backgroundColor: foreground}}>
                <h2 className="main-heading">Checkout</h2>
                <h3 >Delivery Detail</h3>
                <div className= 'address-container'>
                    <i className="ph ph-map-pin"></i>
                    <p>15, Yemen Road, Yemen</p>
                </div>
                <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" className="phone-input" />

                <h4 className="small-heading">Order List</h4>
                <table>
                     <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="table-row">
                            <div className="product-details">
                            <td>
                                 <img src={product.image} alt={product.title} className="product-image" />
                            </td>
                              <td>
                                 <div>
                                    <div className="product-title">{product.title}</div>
                                    <div className="product-price">{`₹${product.price}`}</div>
                                </div>
                              </td> 
                               
                                
                            </div>
                            <td>
                                 <div className="quantity-container">
                                
                                <div>{product.quantity}</div>
                            </div>
                            </td>
                           
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <h4 className="small-heading">Promo Code</h4>
                <div className="promocode-container">
                    <input type="text" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Enter Promo Code" className="promo-input" />
                    <div role='button' className="apply-box" onClick={handleDiscount}>APPLY</div>
                </div>
                {
                     totalAmount.discount > 0 && (
                        <div>
                            Promo applied
                        </div>
                    )
                }

                <h3>Order Summary</h3>
                <div className="order-summary">
                    <div className="summary-detail-container">
                        <p className="product-title">Order Amount</p>
                        <p className="product-price">₹{totalAmount.total}</p>
                    </div>
                    <div className="summary-detail-container">
                        <p className="product-title">Delivery Fee</p>
                        <p className="product-price">₹{totalAmount.deliveryFee}</p>
                    </div>
                    <div className="summary-detail-container">
                        <p className="product-title">Discount</p>
                        <p className="product-price">₹{totalAmount.discount}</p>
                    </div>
                </div>
                <div className="total-outer-container">
                    <div className="total-container">
                        <p className="product-title">TOTAL</p>
                        <h3 className="total-price">₹{totalAmount.total + totalAmount.deliveryFee - totalAmount.discount}</h3>
                    </div>
                    <div>
                        <div className="payment-button" onClick={handlePaymentClick}>
                            Payment
                        </div>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;