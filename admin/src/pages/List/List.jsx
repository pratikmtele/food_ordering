import React, { useEffect, useState } from 'react';
import './List.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import Searchbar from '../../components/Searchbar/Searchbar';
import {Link} from 'react-router-dom';

const List = () => {

  const [list,setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const onSubmitHandler = (e)=>{
    e.preventDefault();
  }

  const onChangeHandler = (e)=>{
    setSearch(e.target.value);
  }

  useEffect(()=>{
    setSearchedItem(list.filter((item)=> item.name.toLowerCase().includes(search)));
  }, [search]);

  return (
    <div className='list add flex-col'>
        <Searchbar onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler}/>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {search? searchedItem.map((item, index)=>{
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className='action-icons'>
                  <Link to={`/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=>removeFood(item._id)}></img>
                </div>
              </div>
            )
          }): list.map((item, index)=>{
            return (
              <div key={item._id} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className='action-icons'>
                  <Link to={`/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=>removeFood(item._id)}></img>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
