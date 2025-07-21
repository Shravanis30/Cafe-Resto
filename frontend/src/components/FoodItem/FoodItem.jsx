// // // import React, { useContext, useState } from 'react'
// // // import './FoodItem.css'
// // // import { assets } from '../../assets/assets'
// // // import { StoreContext } from '../../Context/StoreContext';

// // // const FoodItem = ({ image, name, price, desc , id }) => {

// // //     const [itemCount, setItemCount] = useState(0);
// // //     const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

// // //     return (
// // //         <div className='food-item'>
// // //             <div className='food-item-img-container'>
// // //                 <img className='food-item-image' src={url+"/images/"+image} alt="" />
// // //                 {!cartItems[id]
// // //                 ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
// // //                 :<div className="food-item-counter">
// // //                         <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
// // //                         <p>{cartItems[id]}</p>
// // //                         <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
// // //                     </div>
// // //                 }
// // //             </div>
// // //             <div className="food-item-info">
// // //                 <div className="food-item-name-rating">
// // //                     <p>{name}</p> <img src={assets.rating_starts} alt="" />
// // //                 </div>
// // //                 <p className="food-item-desc">{desc}</p>
// // //                 <p className="food-item-price">{currency}{price}</p>
// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default FoodItem


// // import React, { useContext, useState } from 'react';
// // import './FoodItem.css';
// // import { assets } from '../../assets/assets';
// // import { StoreContext } from '../../Context/StoreContext';

// // const FoodItem = ({ image, name, price, desc, id }) => {
// //   const [itemCount, setItemCount] = useState(0);
// //   const { cartItems = {}, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

// //   return (
// //     <div className='food-item'>
// //       <div className='food-item-img-container'>
// //         <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />

// //         {!cartItems?.[id] ? (
// //           <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
// //         ) : (
// //           <div className="food-item-counter">
// //             <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
// //             <p>{cartItems[id]}</p>
// //             <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
// //           </div>
// //         )}
// //       </div>
// //       <div className="food-item-info">
// //         <div className="food-item-name-rating">
// //           <p>{name}</p> <img src={assets.rating_starts} alt="Rating" />
// //         </div>
// //         <p className="food-item-desc">{desc}</p>
// //         <p className="food-item-price">{currency}{price}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FoodItem;


// import React, { useContext, useState } from 'react';
// import './FoodItem.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../Context/StoreContext';

// const FoodItem = ({ image, name, price, desc, id }) => {
//   const [itemCount, setItemCount] = useState(0);
//   const { cartItems = {}, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

//   return (
//     <div className='food-item'>
//       <div className='food-item-img-container'>
//         <img className='food-item-image' src={image} alt={name} /> {/* ✅ fixed here */}

//         {!cartItems?.[id] ? (
//           <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
//         ) : (
//           <div className="food-item-counter">
//             <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
//             <p>{cartItems[id]}</p>
//             <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
//           </div>
//         )}
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p> <img src={assets.rating_starts} alt="Rating" />
//         </div>
//         <p className="food-item-desc">{desc}</p>
//         <p className="food-item-price">{currency}{price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;



import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import FoodPopup from '../FoodPopup/FoodPopup';

const FoodItem = ({ image, name, price, desc, id }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const { cartItems = {}, addToCart, removeFromCart, currency } = useContext(StoreContext);

  return (
    <>
      <div className='food-item' onClick={() => setPopupOpen(true)}>
        <div className='food-item-img-container'>
          <img className='food-item-image' src={image} alt={name} />
          {!cartItems?.[id] ? (
            <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="Add" />
          ) : (
            <div className="food-item-counter" onClick={(e) => e.stopPropagation()}>
              <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p> <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{desc}</p>
          <p className="food-item-price">{currency}{price}</p>
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
