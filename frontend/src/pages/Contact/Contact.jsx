import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1 className="contact-title">CONTACT US</h1>
        <p className="contact-subtitle">Cafe&Resto</p>
      </header>

      <section className="contact-flex-content">
        <div className="contact-message">
          <span className="section-label">KEEP CLOSE</span>
          <h2>Get In Touch</h2>
          <p>
            We’d love to hear from you! Whether it’s a question about our menu,
            reservation, events, or just to say hello — our team is always happy
            to help. Reach out to us using the information below or the contact form.
          </p>

          {/* Contact Info Boxes */}
          <div className="contact-info-grid small-boxes">
            <div className="info-box">
              <FaMapMarkerAlt className="info-icon" />
              <h4>Address</h4>
              <p>13 Marine Drive, Mumbai, Maharashtra 400002, India</p>
            </div>
            <div className="info-box">
              <FaPhoneAlt className="info-icon" />
              <h4>Phone</h4>
              <p>+91 98212 34567<br />+91 98101 23456</p>
            </div>
            <div className="info-box">
              <FaEnvelope className="info-icon" />
              <h4>Email</h4>
              <p>support@caferesto.in<br />reservations@caferesto.in</p>
            </div>
            <div className="info-box">
              <FaClock className="info-icon" />
              <h4>Hours</h4>
              <p>Open: 10:00 AM – 11:00 PM<br />All Days</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="contact-follow">
            <span>FOLLOW US</span>
            <div className="contact-social-icons">
              <a href="https://facebook.com/caferesto" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/caferesto" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/caferesto" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/caferesto" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" autoComplete="off">
          <h2>Your Details</h2>
          <p>Let us know how we can help you.</p>
          <div className="contact-form-row">
            <div className="form-group">
              <label htmlFor="name">NAME *</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">EMAIL ADDRESS *</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">SUBJECT *</label>
            <input type="text" id="subject" name="subject" placeholder="Reservation Inquiry" required />
          </div>
          <div className="form-group">
            <label htmlFor="comments">COMMENTS / QUESTIONS *</label>
            <textarea id="comments" name="comments" placeholder="Type your message here..." rows="5" required />
          </div>
          <button type="submit" className="contact-btn">CONTACT US</button>
        </form>
      </section>

      {/* Reservation CTA */}
      <section className="reserve-hero">
        <div className="reserve-overlay">
          <h4>BOOK NOW</h4>
          <h2>Reserve A Table Now</h2>
          <button className="reserve-btn" onClick={() => navigate("/reserve-table")}>
            MAKE A RESERVATION
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
