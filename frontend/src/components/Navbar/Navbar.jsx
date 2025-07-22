import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { FaShoppingBasket, FaUserCircle, FaBars, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { assets } from '../../assets/assets'; // Make sure logo is in assets

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      {/* Logo */}
      <Link to='/' onClick={() => setMenu('home')}>
        <img className='logo' src={assets.logo} alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <Link to="/menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>
        <Link to="/about" onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</Link>
        <Link to="/contact" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</Link>

        {/* Mobile Auth Buttons */}
        {/* {!token ? (
          <button className='mobile-login-btn' onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <>
            <li onClick={() => navigate('/myorders')}>
              <FaClipboardList />
              <span>Orders</span>
            </li>
            <li onClick={logout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </>
        )} */}
        {!token && (
          <button className='mobile-login-btn' onClick={() => setShowLogin(true)}>Sign In</button>
        )}

      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <Link to='/cart' className='navbar-cart'>
          <FaShoppingBasket size={22} />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile-wrapper">
            <FaUserCircle size={26} onClick={() => setProfileOpen(!profileOpen)} />
            {profileOpen && (
              <div className="navbar-profile-dropdown">
                <div onClick={() => { setProfileOpen(false); navigate('/myorders'); }}>
                  <FaClipboardList /> My Orders
                </div>
                <div onClick={() => { setProfileOpen(false); logout(); }}>
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            )}
          </div>
        )}


        <div className="navbar-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars size={24} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
