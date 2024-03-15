"use client";

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchProducts } from '@/store/reducers/paymentStore';

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
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', color: 'black'}}>
            <div style={{width: '60vh', height: '80vh', background: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'scroll'}}>
                <h2 style={{display: 'flex', justifyContent: 'center'}}>Checkout</h2>
                <h4 style={{fontWeight: 'bold'}}>Delivery Details</h4>
                <div style={{display: 'flex', background: 'silver', padding: '0.5rem', width: '14rem', alignItems: 'center', gap: '0.5rem'}}>
                    <i class="ph ph-map-pin"></i>
                    <p>15, Yemen Road, Yemen</p>
                </div>
                <input type="tel" placeholder="Phone Number" style={{width: '14rem', padding: '0.5rem', backgroundColor: 'white', border: '0.1rem solid grey', color: 'black'}} />

                <h4 style={{fontWeight: 'bold'}}>Order List</h4>
                {products.map((product) => (
                    <div key={product.id} style={{display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', gap: '1rem', alignItems: 'center', width: '70%'}}>
                            <img src={product.image} alt={product.title} style={{width: '3rem', height: '3rem'}} />
                            <div>{product.title}</div>
                        </div>
                         <div style={{display: 'flex', gap: '1rem'}}>
                             <div>{`₹${product.price}`}</div>
                            <div>{product.quantity}pcs</div>
                        </div>
                    </div>
                ))}
                <h4>Promo Code</h4>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <input type="text" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Enter Promo Code" style={{width: '14rem', padding: '0.5rem', backgroundColor: 'white', border: '0.1rem solid grey', color: 'black'}} />
                    <div role='button' style={{color: 'blue', cursor: 'pointer'}} onClick={handleDiscount}>Apply</div>
                </div>

                <h3>Order Summary</h3>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Order Amount</p>
                        <p>₹{totalAmount.total}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Delivery Fee</p>
                        <p>₹{totalAmount.deliveryFee}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p>Discount</p>
                        <p>₹{totalAmount.discount}</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <p>Total</p>
                        <h3>₹{totalAmount.total + totalAmount.deliveryFee - totalAmount.discount}</h3>
                    </div>
                     <Link href="/payment">
                        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'purple', padding: '0.5rem 1rem', alignItems: 'center', height: '2rem', marginTop: '1rem'}}>
                            Payment
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;