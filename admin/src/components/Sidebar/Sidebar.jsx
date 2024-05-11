import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/menu' end className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Menu</p>
        </NavLink>
        <NavLink to='/menu/list' end className="sidebar-option">
            <img src={assets.List_icon} alt="" />
            <p>List Menus</p>
        </NavLink>
        <NavLink to='/food/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/food/list' className="sidebar-option">
            <img src={assets.List_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        <NavLink to='/discount/add' end className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Discount</p>
        </NavLink>
        <NavLink to='/discount/list' end className="sidebar-option">
            <img src={assets.List_icon} alt="" />
            <p>List Discounts</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar
