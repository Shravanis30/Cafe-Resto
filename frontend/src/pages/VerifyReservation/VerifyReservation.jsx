import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerifyReservation.css'; // Optional: for styling

const VerifyReservation = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const reservationId = urlParams.get('reservationId');

    // ✅ Only call the backend if we have a reservation ID
    if (!reservationId) {
      setMessage("Invalid reservation link.");
      setLoading(false);
      return;
    }

    // ✅ Call backend /verify-reservation API
    axios.get(
      `${import.meta.env.VITE_API}/api/reservation/verify-reservation?success=${success}&reservationId=${reservationId}`
    )
      .then((res) => {
        setMessage(res.data.message || "Reservation verified.");
      })
      .catch((err) => {
        console.error("Verification failed:", err);
        setMessage("Reservation verification failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="verify-container">
      <h2>Reservation Status</h2>
      {loading ? <p>Verifying your reservation...</p> : <p>{message}</p>}
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default VerifyReservation;
