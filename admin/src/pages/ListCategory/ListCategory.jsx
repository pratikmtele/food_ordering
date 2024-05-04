import React, { useEffect, useState } from 'react';
import "./ListCategory.css";
import { url } from '../../assets/assets';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import Searchbar from '../../components/Searchbar/Searchbar.jsx';
import {Link} from 'react-router-dom';

function ListCategory() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedMenu, setSearchedMenu] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/category/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeCategory = async (foodId) => {
    const response = await axios.post(`${url}/api/category/remove`,{
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
    setSearchedMenu(list.filter((item)=> item.name.toLowerCase().includes(search)));
  }, [search])

  return (
      <div className='category-list add flex-col'>
        <Searchbar onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler}/>
        <p>All Menu List</p>
        <div className='category-list-table'>
          <div className="category-list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Action</b>
          </div>
          {search? searchedMenu.map((item, index)=>{
            return (
              <div key={index} className='category-list-table-format'>
                <img src={`${url}/image/`+item.image} alt="" />
                <p>{item.name}</p>
                <div className='action-icons'>
                  <Link to={`/menu/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=>removeCategory(item._id)}></img>
                </div>
              </div>
            )
          }): list.map((item, index)=>{
            return (
              <div key={index} className='category-list-table-format'>
                <img src={`${url}/image/`+item.image} alt="" />
                <p>{item.name}</p>
                <div className='action-icons'>
                  <Link to={`/menu/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=>removeCategory(item._id)}></img>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default ListCategory
