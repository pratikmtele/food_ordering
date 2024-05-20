import React, { useContext, useState } from 'react'
import './AddDiscount.css'
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDiscount = () => {

    const [data, setData] = useState({
        code: "",
        discountAmount: "",
        usageLimit: "",
        minimumPurchaseAmount: ""
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const response = await axios.post(`${url}/api/discount/add`, data);

        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                code: "",
                discountAmount: "",
                usageLimit: "",
                minimumPurchaseAmount: ""
            })
        }
        else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-product-name flex-col'>
                    <p>Code</p>
                    <input name='code' onChange={onChangeHandler} value={data.code} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Discount Amount</p>
                    <input name='discountAmount' onChange={onChangeHandler} value={data.discountAmount} type="number" placeholder='Type here' required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Usage Limit</p>
                    <input name='usageLimit' onChange={onChangeHandler} value={data.usageLimit} type="number" placeholder='Type here' required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Minimum Purchase Amount</p>
                    <input name='minimumPurchaseAmount' onChange={onChangeHandler} value={data.minimumPurchaseAmount} type="number" placeholder='Type here' />
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default AddDiscount
