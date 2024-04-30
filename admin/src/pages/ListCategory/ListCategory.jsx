import React, { useEffect, useState } from 'react';
import "./ListCategory.css";
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function ListCategory() {
  const [list,setList] = useState([]);
  
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

  return (
    <div className='category-list add flex-col'>
        <p>All Category List</p>
        <div className='category-list-table'>
          <div className="category-list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Action</b>
          </div>
          {list.map((item, index)=>{
            return (
              <div key={index} className='category-list-table-format'>
                <img src={`${url}/image/`+item.image} alt="" />
                <p>{item.name}</p>
                <p className='cursor' onClick={()=>removeCategory(item._id)}>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default ListCategory
