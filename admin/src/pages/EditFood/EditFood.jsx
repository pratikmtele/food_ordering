import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import './EditFood.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import {StoreContext} from '../../context/StoreContext'

const EditFood = () => {

    const {id} = useParams();

    const {category_list} = useContext(StoreContext);

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ''
    });

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [name]: value}));

    }

    useEffect(()=>{
        async function fetchFood(){
            const res = await axios.get(`${url}/api/food/${id}`);
            setData(res.data.data);
        }
        fetchFood();
    }, [id]);

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image){
            formData.append("image", image);
        } else {
            formData.append("image", data.image);
        }
        const res = await axios.post(`${url}/api/food/update/${id}`, formData);
        if (res.data.success) {
            toast.success(res.data.message)
            setData(res.data.data);
        } else {
            toast.error(res.data.message);
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={!image? `${url}/images/${data.image}`: URL.createObjectURL(image)} alt="" />
                    </label>
                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} id="image" hidden />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' type="text" placeholder='Type here' value={data.name} onChange={onChangeHandler} required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' type="text" rows={6} placeholder='Write content here' onChange={onChangeHandler} value={data.description} required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category'value={data.category} onChange={onChangeHandler} >
                            {category_list.map((item)=>{
                                return <option key={item._id} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='₹25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >Update</button>
            </form>
        </div>
    )
}

export default EditFood
