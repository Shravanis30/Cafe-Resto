// src/pages/ReservationSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ReservationSuccess.css';
import { FaCheckCircle } from 'react-icons/fa';

const ReservationSuccess = () => {
  return (
    <div className="reservation-success-container">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />
        <h1>Reservation Confirmed!</h1>
        <p>
          Your table has been successfully reserved. We look forward to welcoming you at Cafe&Resto.
        </p>
        <div className="success-buttons">
          <Link to="/">
            <button className="btn back-home">Back to Home</button>
          </Link>
          <Link to="/menu">
            <button className="btn view-menu">Browse Menu</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccess;
