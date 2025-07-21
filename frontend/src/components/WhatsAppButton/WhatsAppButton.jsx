// File: src/components/WhatsAppButton/WhatsAppButton.jsx
import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  return (
    <div className="whatsapp-container">
      <a
        href="https://wa.me/918208305822?text=Hello%21%20I%20need%20help%20with%20my%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
          alt="WhatsApp Icon"
          className="whatsapp-logo"
        />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
