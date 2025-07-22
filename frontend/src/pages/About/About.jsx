import React from "react";
import "./About.css";
import chef from '../../assets/chef.png';
import mains from '../../assets/menu_6.png';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import starter from '../../assets/starter.png'

const CARD_CONTENTS = [
  {
    title: "Gambas al Ajillo",
    img: img1,
    desc: "Classic Spanish appetizer: sizzling prawns with garlic, chili, and olive oil served fresh from the pan."
  },
  {
    title: "Artisan Cheese & Rioja",
    img: img2,
    desc: "A handpicked selection of local cheeses paired with premium Rioja wine."
  },
  {
    title: "Freshly Brewed Espresso",
    img: img3,
    desc: "Our barista pours rich, aromatic espresso from locally roasted beans."
  }
];

const About = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="about-root">
      <div className="about-hero">
        <h1 className="about-title">ABOUT US</h1>
        <p className="about-subtitle">Cafe&amp;Resto</p>
      </div>

      <section className="about-story-section">
        <h3 className="about-mini-title">TASTY AND CRUNCHY</h3>
        <h2 className="about-section-title">Our Story</h2>
        <p className="about-story-desc">
          Welcome to Café del Sol, where tradition and innovation meet. Established in downtown Madrid in 2005, we fuse Spanish classics and contemporary cuisine to create bold, unforgettable flavors. Our chefs source local, organic ingredients to craft every dish. Enjoy a cozy, modern atmosphere and let us serve you the essence of Spain.
        </p>

        <div className="about-cards-grid">
          {CARD_CONTENTS.map((card, idx) => (
            <div className="about-square-card" key={card.title}>
              <img src={card.img} alt={card.title} className="about-card-img" />
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-chef-main">
        <div className="about-chef-info">
          <h3 className="about-mini-title">TASTY AND CRUNCHY</h3>
          <h2 className="about-section-title">Our Chef</h2>
          <p>
            Meet Chef Antonio Herrera, a Madrid native with over 20 years’ culinary experience. Antonio trained at Le Cordon Bleu Paris and brings his passion for Spanish gastronomy to every plate. He believes good food connects people and loves reimagining classics with a contemporary twist.
          </p>

          <button className="about-btn" onClick={handleViewMenu}>
            View Menu
          </button>
        </div>

        <div className="about-chef-imgbox">
          <div className="chef-circle-bg">
            <img
              src={chef}
              alt="Chef Antonio Herrera"
              className="about-chef-img-rect"
            />
          </div>
        </div>
      </section>

      <section className="about-spec-section">
        <h3 className="about-mini-title">TASTY AND CRUNCHY</h3>
        <h2 className="about-section-title">Our Specialties</h2>
        <div className="about-specs-flex">
          <div className="about-spec-card">
            <img src={starter} alt="Starter" />
            <span>Starters</span>
          </div>
          <div className="about-spec-card">
            <img src={mains} alt="Main" />
            <span>Mains</span>
          </div>
          <div className="about-spec-card">
            <img src="https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=200&q=80" alt="Dessert" />
            <span>Desserts</span>
          </div>
        </div>
        <p className="about-spec-desc">
          At Cafe Resto, we blend tradition and taste to serve you fresh, handcrafted dishes made with love. Whether you're here for a quick bite or a cozy meal, our team is dedicated to making every visit memorable.
        </p>

        <div className="about-signature">
          <span>Chef's Signature</span>
        </div>
      </section>
    </div>
  );
};

export default About;
