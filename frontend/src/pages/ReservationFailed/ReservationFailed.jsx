// src/pages/ReservationFailed.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ReservationFailed.css';
import { FaTimesCircle } from 'react-icons/fa';

const ReservationFailed = () => {
  return (
    <div className="reservation-failed-container">
      <div className="failed-card">
        <FaTimesCircle className="failed-icon" />
        <h1>Reservation Failed</h1>
        <p>
          Something went wrong while confirming your reservation. The table has not been booked.
          Please try again or contact support.
        </p>
        <div className="failed-buttons">
          <Link to="/reserve-table">
            <button className="btn try-again">Try Again</button>
          </Link>
          <Link to="/">
            <button className="btn back-home">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationFailed;
