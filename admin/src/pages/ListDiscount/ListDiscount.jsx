import React, { useEffect, useState } from 'react';
import './ListDiscount.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Searchbar from '../../components/Searchbar/Searchbar';
import {Link} from 'react-router-dom';
import { assets, url } from '../../assets/assets';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const ListDiscount = () => {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/discount/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[]);

  const removeDiscount = async (discountId) => {
    const response = await axios.delete(`${url}/api/discount/${discountId}`);
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }
  
  const onSubmitHandler = (e)=>{
    e.preventDefault();
  }

  const onChangeHandler = (e)=>{
    setSearch(e.target.value);
  }

  useEffect(()=>{
    setSearchedItem(list.filter((item)=> item.code.toLowerCase().includes(search)));
  }, [search]);

  const toggleActiveStatus = async (discountItem) => {
    const response = await axios.put(`${url}/api/discount/update/${discountItem._id}`, {...discountItem, isActive: !discountItem.isActive });

    if (response.data.success) {
        setList(list.map(item => item._id === discountItem._id ? { ...item, isActive: !item.isActive } : item));
    } else {
        toast.error("Error updating item");
    }
}

  return (
    <div className='list add flex-col'>
        <Searchbar onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler}/>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="discount-list-table-format title">
            <b>Code</b>
            <b>Discount</b>
            <b>Usage Limit</b>
            <b>Coupon Used</b>
            <b>Minimum Purchase Amount</b>
            <b>Status</b>
            <b>Action</b>
          </div>
          {search? searchedItem.map((item, index)=>{
            return (
              <div key={index} className='discount-list-table-format'>
                <p>{item.code}</p>
                <p>{item.discount}</p>
                <p>{item.usageLimit}</p>
                <p>{item.usedCount}</p>
                <p>{item.minimumPurchaseAmount === null ? "-" : item.minimumPurchaseAmount}</p>
                <ToggleSwitch onChange={() => toggleActiveStatus(item)} checked={item.isActive}/>
                <div className='action-icons'>
                  <Link to={`/discount/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=> removeDiscount(item._id)}></img>
                </div>
              </div>
            )
          }):
          list.map((item, index)=>{
            return (
              <div key={index} className='discount-list-table-format'>
                <p>{item.code}</p>
                <p>{item.discount}</p>
                <p>{item.usageLimit}</p>
                <p>{item.usedCount}</p>
                <p>{item.minimumPurchaseAmount === null ? "-" : item.minimumPurchaseAmount}</p>
                <ToggleSwitch onChange={() => toggleActiveStatus(item)} checked={item.isActive}/>
                <div className='action-icons'>
                  <Link to={`/discount/update/`+item._id}>
                    <img className='cursor icons edit-icon' src={assets.Edit_icon}/>
                  </Link>
                  <img className='cursor icons' src={assets.Remove_icon} onClick={()=> removeDiscount(item._id)}></img>
                </div>
              </div>
            )
          })}
          
        </div>
    </div>
  )
}

export default ListDiscount

