import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const {id} = useParams();

    const [discount, setdiscount] = useState(null);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, fetchDiscountCouponById, url } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData;
        if (discount){
            console.log(discount);
            orderData = {
                address: data,
                items: orderItems,
                amount: getTotalCartAmount() + 20 - discount,
                discount: discount
            }
        } else {
            orderData = {
                address: data,
                items: orderItems,
                amount: getTotalCartAmount() + 20,
                discount: 110
            }
        }

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token]);

    useEffect(() => {
        fetchDiscountCoupon()
    }, [id]);

    async function fetchDiscountCoupon() {
        if (id){
            const response = await fetchDiscountCouponById(id);
            setdiscount(response.discount);
        }
    }

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p></div>
                        <hr />
                        {discount?<div className="cart-total-details"><p>Discount</p><span className='discount'>-₹{discount}</span></div>:null}
                        {discount?<hr />:null}
                        <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount()===0?0: discount? getTotalCartAmount()+20-discount: getTotalCartAmount()+20}</b></div>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>Proceed To Payment</button>
            </div>
        </form>
    )
}

export default PlaceOrder
