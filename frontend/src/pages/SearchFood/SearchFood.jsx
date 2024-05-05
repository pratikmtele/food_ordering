import React, { useContext, useEffect, useState } from 'react';
import './SearchFood.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import { assets } from '../../assets/assets';


function SearchFood() {

    const [searchFood, setSearchFood] = useState("");
    const [searchedFood, setSearchedFood] = useState([]);

    const {food_list} = useContext(StoreContext);

    useEffect(()=>{
        setSearchedFood(food_list.filter((item)=>item.name.toLowerCase().includes(searchFood)))
        console.log(searchedFood);
    }, [searchFood]);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
    }

  return (
    <div>
        <form className='search-form' onClick={onSubmitHandler}>
            <img className='search_icon' src={assets.Search_icon} alt="Search_icon" srcset="" />
            <input type="text" className='search-input' placeholder='Search Food' onChange={(e)=>setSearchFood(e.target.value)}/>
        </form>

        {/* food Items */}

        <div className='food-display' id='food-display'>
            {searchFood?<h2>Search Results for "{searchFood}"</h2>:<></>}
            {searchFood?<p className='search-result'>About {searchedFood.length} Results</p>: <></>}
            <div className='food-display-list'>
            {searchFood? searchedFood.map((item)=>{
                return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
            }): food_list.map((item)=>{
                return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
            })}
            </div>
        </div>
    </div>
  )
}

export default SearchFood
