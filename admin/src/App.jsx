import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from './pages/Category/Category';
import ListCategory from './pages/ListCategory/ListCategory.jsx';
import EditFood from './pages/EditFood/EditFood.jsx';
import EditCategory from './pages/EditCategory/EditCategory.jsx';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/menu' element={<Category/>} />
          <Route path='/menu/list' element={<ListCategory/>}/>
          <Route path="/food/add" element={<Add/>}/>
          <Route path='/update/:id' element={<EditFood/>}/>
          <Route path='/menu/update/:id' element={<EditCategory/>}/>
          <Route path="/food/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
