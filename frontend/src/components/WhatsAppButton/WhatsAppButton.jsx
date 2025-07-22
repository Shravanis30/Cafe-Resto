// File: src/components/WhatsAppButton/WhatsAppButton.jsx
import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918208305822?text=Hello%21%20I%20need%20help%20with%20my%20order"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
        alt="Chat on WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppButton;
