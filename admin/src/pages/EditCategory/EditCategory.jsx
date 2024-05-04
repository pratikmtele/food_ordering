import React, { useState, useEffect } from 'react'
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

const EditCategory = () => {

    const {id} = useParams();

    const [data, setData] = useState({
        name: "",
    });

    const [image, setImage] = useState(false);

    useEffect(()=>{
        async function fetchCategory(){
            const res = await axios.get(`${url}/api/category/${id}`);
            setData(res.data.data);
        }
        fetchCategory();
    }, [id]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        if (image){
            formData.append("image", image);
        }else {
            formData.append("image", data.image);
        }
        const res = await axios.post(`${url}/api/category/update/${id}`, formData);
        if (res.data.success) {
            toast.success(res.data.message)
            setData(res.data.data);
        } else {
            toast.error(res.data.message);
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
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={!image ? `${url}/image/${data.image}` : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default EditCategory
