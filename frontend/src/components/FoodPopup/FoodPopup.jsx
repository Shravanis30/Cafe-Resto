import React, { useContext } from 'react';
import './FoodPopup.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const FoodPopup = ({ image, name, price, desc, id, onClose }) => {
  const { cartItems = {}, addToCart, removeFromCart, currency } = useContext(StoreContext);

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

        <div className="food-popup-cart-controls">
          {!cartItems?.[id] ? (
            <button onClick={() => addToCart(id)}>Add to Cart</button>
          ) : (
            <div className="popup-counter">
              <button onClick={() => removeFromCart(id)}>-</button>
              <span>{cartItems[id]}</span>
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPopup;
