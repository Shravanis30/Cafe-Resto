// About.jsx
import React from "react";
import "./About.css";
import chef from '../../assets/chef.png'
import mains from '../../assets/menu_6.png'
import starter from '../../assets/food_22.png'
const CARD_CONTENTS = [
  {
    title: "Spain Appetizer",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam per spicatis unde omnis iste natus."
  },
  {
    title: "Wine and Cheese",
    img: "https://www.cottercrunch.com/wine-and-cheese-party/",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam per spicatis unde omnis iste natus."
  },
  {
    title: "Cups Of Coffee",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam per spicatis unde omnis iste natus."
  }
];

const About = () => (
  <div className="about-root">
    <div className="about-hero">
      <h1 className="about-title">About Us</h1>
      <p className="about-subtitle">Cafe&amp;Resto</p>
    </div>
    <section className="about-story-section">
      <h3 className="about-mini-title">TASTY AND CRUNCHY</h3>
      <h2 className="about-section-title">Our Story</h2>
      <p className="about-story-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ex ea commodo consequat consectetur adipiscing elit ut aliquip ex ea.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ex ea commodo consequat consectetur adipiscing elit ut aliquip ex ea commodo.
        </p>
        <button className="about-btn">View Menu</button>
      </div>
      <div className="about-chef-imgbox">
        <img
          src={chef}
          alt="Our Chef"
          className="about-chef-img"
        />
      </div>
    </section>
    <section className="about-spec-section">
      <h3 className="about-mini-title">TASTY AND CRUNCHY</h3>
      <h2 className="about-section-title">Our Specialties</h2>
      <div className="about-specs-flex">
        <div className="about-spec-card">
          <img src="https://properfoodie.com/honey-glazed-griddled-prawns" alt="Starter" />
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
      </p>
      <div className="about-signature">
        <span>Chef's Signature</span>
      </div>
    </section>
  </div>
);

export default About;
