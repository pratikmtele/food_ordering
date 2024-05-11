import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount, fetchCoupon ,url} = useContext(StoreContext);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const onClickHandler = async (e) => {
    if (code === ""){
     toast.error("Please enter a coupon code");
    }
    else{
      const res = await fetchCoupon(code);
      const isVerified = await verifyCoupon(res);
      if (isVerified){
        setDiscount(res.discount);
        toast.success( "Coupon applied successfully");
      }
    }
  }

  useEffect(() => {
    setDiscount("");
    setCode("");
  }, [cartItems]);

  const onChangeHandler = (e) => {
    setCode(e.target.value);
  }

  const verifyCoupon = async (res) => {
    if (res.minimumPurchaseAmount>getTotalCartAmount()){
      toast.error("Minimum purchase amount not reached");
      return false;
    } else if (res.usedCount > res.usageLimit){
      toast.error("Coupon usage limit reached");
      return false;
    } else if (res.isActive === false){
      toast.error("Coupon is not active");
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <div>{cartItems[item._id]}</div>
                <p>₹{item.price*cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>₹{getTotalCartAmount()===0?0:20}</p></div>
            <hr />
            {discount?<div className='cart-total-details'><p>Discount</p><span className='discount'>-₹{discount}</span></div>:null}
            {discount? <hr />: null}
            <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount()===0?0: discount? getTotalCartAmount()+20-discount: getTotalCartAmount()+20}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' onChange={onChangeHandler} value={code}/>
              <button onClick={onClickHandler}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
