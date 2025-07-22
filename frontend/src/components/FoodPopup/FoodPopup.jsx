import React, { useContext } from 'react';
import './FoodPopup.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const FoodPopup = ({ image, name, price, desc, id, onClose }) => {
  const navigate = useNavigate();
  const { cartItems = {}, addToCart, removeFromCart, currency } = useContext(StoreContext);
  const addedCount = cartItems[id] || 0;

  const handleBuyNow = () => {
    if (!addedCount) addToCart(id);
    navigate('/cart');
  };

  return (
    <div className="food-popup-backdrop" onClick={onClose}>
      <div className="food-popup" onClick={(e) => e.stopPropagation()}>
        <button className="food-popup-close" onClick={onClose}>×</button>

        <img className="food-popup-image" src={image} alt={name} />
        <h2>{name}</h2>
        <p>{desc}</p>
        <div className="food-popup-rating">
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-popup-price">{currency}{price}</p>

        {/* Cart/Buy Controls */}
        <div className="food-popup-buttons">
          {addedCount > 0 ? (
            <div className="popup-counter">
              <button onClick={() => removeFromCart(id)}>-</button>
              <span>{addedCount}</span>
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          ) : (
            <button className="popup-btn" onClick={() => addToCart(id)}>Add to Cart</button>
          )}

          <button className="popup-btn buy" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FoodPopup;
