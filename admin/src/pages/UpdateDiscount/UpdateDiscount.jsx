import React, { useEffect, useState } from 'react'
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateDiscount = () => {

    const {id} = useParams();

    const [data, setData] = useState({
        code: "",
        minimumPurchaseAmount: "",
        isActive: true,
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await axios.put(`${url}/api/discount/update/${id}`, data);

        if (response.data.success) {
            toast.success(response.data.message);
        }
        else {
            toast.error("Error")
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    useEffect(() => {
        const fetchDiscount = async () => {
            const response = await axios.get(`${url}/api/discount/get/${id}`);

            if (response.data.success) {
                setData(response.data.data);
            }
            else {
                toast.error("Error")
            }
        }
        fetchDiscount();
    }, []);

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-product-name flex-col'>
                    <p>Code</p>
                    <input name='code' onChange={onChangeHandler} value={data.code} type="text" placeholder='Type here' required />
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

export default UpdateDiscount
