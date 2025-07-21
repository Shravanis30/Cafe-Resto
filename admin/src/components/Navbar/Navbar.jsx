import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-left' onClick={() => navigate('/')}>
        <img
          src={assets.logo}
          alt="Logo"
          className='navbar-logo'
        />
        <h2 className='dashboard-title'>Admin Dashboard</h2>
      </div>

      <img 
        className='profile' 
        src={assets.profile_image} 
        alt="Profile"
        onClick={() => navigate('/profile')} 
      />
    </div>
  );
};

export default Navbar;
