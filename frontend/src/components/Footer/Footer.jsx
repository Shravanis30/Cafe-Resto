import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Cafe Logo" style={{ width: "180px", height: "auto" }} />
          <p>
            Welcome to Cafe&Resto, where delicious meals meet cozy ambiance.
            Serving handcrafted dishes made with passion and the freshest
            ingredients since 2010. Join us for an unforgettable dining
            experience.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About Us</li>
            <li onClick={() => navigate('/menu')}>Menu</li>
            <li onClick={() => navigate('/contact')}>Contact Us</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@cafe-resto.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © Cafe.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
