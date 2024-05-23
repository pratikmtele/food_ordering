import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Category, ListCategory, Add, EditFood, EditCategory, List, Orders, AddDiscount, ListDiscount, UpdateDiscount} from './pages/index.js';
import Login from './components/Login/Login.jsx';


const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/menu' element={<Category/>} />
          <Route path='/menu/list' element={<ListCategory/>}/>
          <Route path="/food/add" element={<Add/>}/>
          <Route path='/update/:id' element={<EditFood/>}/>
          <Route path='/menu/update/:id' element={<EditCategory/>}/>
          <Route path="/food/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/discount/add" element={<AddDiscount/>}/>
          <Route path="/discount/list" element={<ListDiscount/>}/>
          <Route path="/discount/update/:id" element={<UpdateDiscount/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
