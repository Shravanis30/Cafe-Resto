import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Profile from './pages/Profile/Profile'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import AdminReservation from './pages/AdminReservation/AdminReservation'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Customers from './pages/Customer/Customer'
import Sales from './pages/Sales/Sales'

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservations" element={<AdminReservation />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />

        </Routes>
      </div>
    </div>
  )
}

export default App