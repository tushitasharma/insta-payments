"use client";

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchProducts } from '@/store/reducers/paymentStore';
import '../styles/checkoutPage.css';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const { products, isLoading }= useSelector((state) => state.paymentStore);
    const [discount, setDiscount] = React.useState('');
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
    
    if (isLoading) return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', color: 'black'}}>
            <div style={{width: '60vh', height: '80vh', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'scroll'}}>
                <i class="ph ph-spinner"></i>
            </div>
        </div>
    )


    return (
        <div className="main-container">
            <div className="inner-checkout-container">
                <h2 className="main-heading">Checkout</h2>
                <h3 >Delivery Detail</h3>
                <div className= 'address-container'>
                    <i class="ph ph-map-pin"></i>
                    <p>15, Yemen Road, Yemen</p>
                </div>
                <input type="tel" placeholder="Phone Number" className="phone-input" />

                <h4 className="small-heading">Order List</h4>
                <table>
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
                </table>
                
                <h4 className="small-heading">Promo Code</h4>
                <div className="promocode-container">
                    <input type="text" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Enter Promo Code" className="promo-input" />
                    <div role='button' className="apply-box" onClick={handleDiscount}>APPLY</div>
                    {
                        discount && (
                            <div>
                                Promo applied
                            </div>
                        )
                    }
                </div>

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
                        <Link href="/payment">
                        <div className="payment-button">
                            Payment
                        </div>
                        </Link>
                    </div>
                     
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;