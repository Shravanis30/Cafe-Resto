// import React, { useEffect, useState } from 'react'
// import './List.css'
// // import { url, currency } from '../../assets/assets'
// import { currency } from '../../assets/assets'

// import axios from 'axios';
// import { toast } from 'react-toastify';

// const List = () => {

//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     // const response = await axios.get(`${import.meta.env.VITE_API}/api/food/list`)
//     const url = import.meta.env.VITE_API;
//     const response = await axios.get(`${url}/api/food/list`, { withCredentials: true })
//     if (response.data.success) {
//       setList(response.data.data);
//     }
//     else {
//       toast.error("Error")
//     }
//   }

//   const removeFood = async (foodId) => {
//     // const response = await axios.post(`${import.meta.env.VITE_API}/api/food/remove`, {
//     const response = await axios.post(`${url}/api/food/remove`, {

//       id: foodId
//     })
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     }
//     else {
//       toast.error("Error")
//     }
//   }

//   useEffect(() => {
//     fetchList();
//   }, [])

//   return (
//     <div className='list add flex-col'>
//       <p>All Foods List</p>
//       <div className='list-table'>
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           return (
//             <div key={index} className='list-table-format'>
//               <img src={`${url}/images/` + item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List



import React, { useEffect, useState } from 'react';
import './List.css';
import { currency } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  // ✅ Declare url once, reused in all functions
  const url = import.meta.env.VITE_API;

  // ✅ Fetch list of food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch food list');
      }
    } catch (err) {
      toast.error('Error fetching food list');
      console.error(err);
    }
  };

  // ✅ Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list
      } else {
        toast.error('Failed to remove food');
      }
    } catch (err) {
      toast.error('Error removing food item');
      console.error(err);
    }
  };

  // ✅ Fetch list on mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p className="cursor" onClick={() => removeFood(item._id)}>
              ❌
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
