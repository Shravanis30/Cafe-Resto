// import React, { useState } from 'react'
// import Home from './pages/Home/Home'
// import Footer from './components/Footer/Footer'
// import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Cart from './pages/Cart/Cart'
// import LoginPopup from './components/LoginPopup/LoginPopup'
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
// import MyOrders from './pages/MyOrders/MyOrders'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Verify from './pages/Verify/Verify'
// import About from './pages/About/About'
// import Menu from './pages/Menu/Menu'

// const App = () => {

//   const [showLogin,setShowLogin] = useState(false);

//   return (
//     <>
//     <ToastContainer/>
//     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
//       <div className='app'>
//         <Navbar setShowLogin={setShowLogin}/>
//         <Routes>
//           <Route path='/' element={<Home />}/>
//           <Route path='/cart' element={<Cart />}/>
//           <Route path='/order' element={<PlaceOrder />}/>
//           <Route path='/myorders' element={<MyOrders />}/>
//           <Route path='/verify' element={<Verify />}/>



//           <Route path='/about' element={<About />}/>
//           <Route path='/menu' element={<Menu />}/>

//         </Routes>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default App


import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'; // ✅ NEW
import ReserveTable from './pages/ReservationTable/ReserveTable';
import VerifyReservation from './pages/VerifyReservation/VerifyReservation';
import Contact from './pages/Contact/Contact';
import ReservationFailed from './pages/ReservationFailed/ReservationFailed';
import ReservationSuccess from './pages/ReservationSuccess/ReservationSuccess';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/reserve-table' element={<ReserveTable />} />
          <Route path="/verify-reservation" element={<VerifyReservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation-failed" element={<ReservationFailed />} />
          <Route path="/reservation-success" element={<ReservationSuccess />} />

        </Routes>
      </div>

      <WhatsAppButton /> 
      <Footer />
    </>
  );
};

export default App;
