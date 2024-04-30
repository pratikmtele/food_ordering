import React from 'react';
import './Searchbar.css';
import { assets } from '../../assets/assets';

function Searchbar(props) {
  return (
    <form className='search-form' onSubmit={props.onSubmitHandler}>
        <img className='search_icon' src={assets.Search_icon} alt="Search_icon"/>
        <input type="text" className='search-input' placeholder='Search Food' onChange={props.onChangeHandler}/>
    </form>
  )
}

export default Searchbar
