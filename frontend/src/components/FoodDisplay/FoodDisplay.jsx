
import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const url = import.meta.env.VITE_API || 'https://cafe-resto-production.up.railway.app';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Dynamic heading
  const displayHeading =
    category === 'All' ? 'Top Dishes' : `${category} Items`;

  // Group top 2 items by category (for All)
  const getTopTwoPerCategory = () => {
    const grouped = {};
    food_list.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      if (grouped[item.category].length < 2) {
        grouped[item.category].push(item);
      }
    });

    // flatten into array
    return Object.values(grouped).flat();
  };

  const filteredItems =
    category === 'All'
      ? getTopTwoPerCategory()
      : food_list.filter(item => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>{displayHeading}</h2>
      <div className="food-display-list">
        {filteredItems.map((item, index) => {
          const imageUrl = item.image?.startsWith('http')
            ? item.image
            : `${url}/images/${item.image}`;

          return (
            <FoodItem
              key={`${item._id}-${index}`}
              image={imageUrl}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
