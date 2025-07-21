// import React, { useContext } from 'react';
// import './FoodDisplay.css';
// import FoodItem from '../FoodItem/FoodItem';
// import { StoreContext } from '../../Context/StoreContext';

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top dishes</h2>
//       <div className="food-display-list">
//         {food_list.length > 0 &&
//           food_list.map((item, index) => {
//             if (category === 'All' || category === item.category) {
//               const imageUrl = `${import.meta.env.VITE_API}/images/${item.image}`;
//               console.log("Rendering item:", {
//                 id: item._id,
//                 name: item.name,
//                 image: item.image,
//                 imageUrl,
//               });
//               console.log("Image URL:", `${import.meta.env.VITE_API}/images/${item.image}`);


//               return (
//                 <FoodItem
//                   key={`${item._id}-${index}`}  // make key unique just in case
//                   image={imageUrl}
//                   name={item.name}
//                   desc={item.description}
//                   price={item.price}
//                   id={item._id}
//                 />
//               );
//             }
//             return null;
//           })}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;




import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

// ✅ Define API base URL once at the top
const url = import.meta.env.VITE_API || 'https://cafe-resto-production.up.railway.app';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes</h2>
      <div className="food-display-list">
        {food_list.length > 0 &&
          food_list.map((item, index) => {
            if (category === 'All' || category === item.category) {
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
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
