import {React, useEffect, useState, useContext} from 'react';
import './FoodDesc.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useParams } from 'react-router-dom';

function FoodDesc() {

    const {id} = useParams();
    const {url, addToCart} = useContext(StoreContext);
    const [food, setFood] = useState({});

    useEffect(()=>{
        async function fetchCategory(){
            const res = await axios.get(`${url}/api/food/${id}`);
            setFood(res.data.data);
        }
        fetchCategory();
    }, [id]);

  return (
    <div className='food-desc-container'>
        <div className='food-image'>
            <img src={`${url}/images/${food.image}`} alt="" />
        </div>
        <div className='food-desc'>
            <h2>{food.name}</h2>
            <p className='food-price'>₹ {food.price}</p>
            <button type='button' onClick={()=> addToCart(id)}>Add To Cart</button>
            <h3>DETAILS ABOUT THIS MEAL</h3>
            <p className='food-info'>{food.description}</p>
        </div>
    </div>
  )
}

export default FoodDesc
