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
        console.log(searchFood);
        setSearchedFood(food_list.filter((item)=>item.name.includes(searchFood)))
    }, [searchFood]);

    const onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(searchedFood);
    }

  return (
    <div>
        <form className='search-form' onClick={onSubmitHandler}>
            <img className='search_icon' src={assets.Search_icon} alt="Search_icon" srcset="" />
            <input type="text" className='search-input' placeholder='Search Food' onChange={(e)=>setSearchFood(e.target.value)}/>
            {/* <button className='search-btn' type='submit'>Search</button> */}
        </form>

        {/* food Items */}

        <div className='food-display' id='food-display'>
            {searchFood?<h2>Search Results for "{searchFood}"</h2>:<></>}
            {searchFood?<p className='search-result'>About {searchedFood.length} Results</p>: <></>}
            <div className='food-display-list'>
            {searchedFood? searchedFood.map((item)=>{
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