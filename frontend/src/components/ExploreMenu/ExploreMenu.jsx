import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category, setCategory}) => {

  const {category_list, url} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {category_list.map((item)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={item._id} className='explore-menu-list-item'>
                    <img src={url+"/image/"+item.image} className={category===item.name?"active":""} alt="" />
                    <p>{item.name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
