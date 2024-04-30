import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/category' className="sidebar-option">
            <img src={assets.category_icon} alt="" />
            <p>Add Menu</p>
        </NavLink>
        <NavLink to='/category-list' className="sidebar-option">
            <img src={assets.List_icon} alt="" />
            <p>List Menus</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.List_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar
