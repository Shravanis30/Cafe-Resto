import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import FoodPopup from '../FoodPopup/FoodPopup';

const FoodItem = ({ image, name, price, desc, id }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { cartItems = {}, addToCart, removeFromCart, currency } = useContext(StoreContext);

  const addedCount = cartItems[id] || 0;

  const handleAddToCart = () => {
    addToCart(id);
  };

  return (
    <>
      <div className="food-item" onClick={() => setPopupOpen(true)}>
        <div className="food-item-img-container">
          <img className="food-item-image" src={image} alt={name} />
        </div>

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{desc}</p>
          <p className="food-item-price">{currency}{price}</p>
        </div>

        {/* Always visible Add to Cart */}
        <div className="food-item-controls">
          {addedCount > 0 && (
            <div className="food-item-counter" onClick={(e) => e.stopPropagation()}>
              <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="-" />
              <p>{addedCount}</p>
              <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="+" />
            </div>
          )}
          <button className="food-add-btn" onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}>
            Add to Cart
          </button>

        </div>
      </div>

      {popupOpen && (
        <FoodPopup
          image={image}
          name={name}
          price={price}
          desc={desc}
          id={id}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </>
  );
};

export default FoodItem;
