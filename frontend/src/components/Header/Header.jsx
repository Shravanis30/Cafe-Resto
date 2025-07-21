import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Seamless Ordering, Anywhere You Are</h2>
        <p>
          Whether you're dining at our cozy café or ordering from the comfort of your home,
          we've got you covered. Browse our chef-curated menu, place your order directly from
          your table or online, and enjoy fresh, delicious food served your way.
        </p>
        <div className="header-buttons">
          <button onClick={() => navigate('/menu')}>View Menu</button>
          <button className="reserve-btn" onClick={() => navigate('/reserve-table')}>Reserve Table</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
