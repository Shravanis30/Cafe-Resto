// // import React, { useEffect, useState } from 'react'
// // import './Orders.css'
// // import { toast } from 'react-toastify';
// // import axios from 'axios';
// // import { assets, url, currency } from '../../assets/assets';

// // const Order = () => {

// //   const [orders, setOrders] = useState([]);

// //   const fetchAllOrders = async () => {
// //     // const response = await axios.get(`${url}/api/order/list`)
// //     const url = import.meta.env.VITE_API;
// //     const response = await axios.get(`${url}/api/order/list`, { withCredentials: true })
// //     if (response.data.success) {
// //       setOrders(response.data.data.reverse());
// //     }
// //     else {
// //       toast.error("Error")
// //     }
// //   }

// //   const statusHandler = async (event, orderId) => {
// //     console.log(event, orderId);
// //     // const response = await axios.post(`${import.meta.env.VITE_API}/api/order/status`, {
// //     const response = await axios.post(`${url}/api/order/status`, {

// //       orderId,
// //       status: event.target.value
// //     })
// //     if (response.data.success) {
// //       await fetchAllOrders();
// //     }
// //   }


// //   useEffect(() => {
// //     fetchAllOrders();
// //   }, [])

// //   return (
// //     <div className='order add'>
// //       <h3>Order Page</h3>
// //       <div className="order-list">
// //         {orders.map((order, index) => (
// //           <div key={index} className='order-item'>
// //             <img src={assets.parcel_icon} alt="" />
// //             <div>
// //               {/* <p className='order-item-food'>
// //                 {order.items.map((item, index) => {
// //                   if (index === order.items.length - 1) {
// //                     return item.name + " x " + item.quantity
// //                   }
// //                   else {
// //                     return item.name + " x " + item.quantity + ", "
// //                   }
// //                 })}
// //               </p> */}
// //               <p className='order-item-name'>
// //                 {order.address.firstName + " " + order.address.lastName}
// //                 {order.orderType === "dinein" && ` (Table ${order.tableNumber})`}
// //               </p>

// //               <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
// //               <div className='order-item-address'>
// //                 <p>{order.address.street + ","}</p>
// //                 <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
// //               </div>
// //               <p className='order-item-phone'>{order.address.phone}</p>
// //             </div>
// //             <p>Items : {order.items.length}</p>
// //             <p>{currency}{order.amount}</p>
// //             <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="">
// //               <option value="Food Processing">Food Processing</option>
// //               <option value="Out for delivery">Out for delivery</option>
// //               <option value="Delivered">Delivered</option>
// //             </select>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Order


// import React, { useEffect, useState } from 'react';
// import './Orders.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { assets, currency } from '../../assets/assets';

// const Order = () => {
//   const [orders, setOrders] = useState([]);

//   // ✅ Define URL once
//   const url = import.meta.env.VITE_API;

//   // ✅ Fetch All Orders
//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(`${url}/api/order/list`, {
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         setOrders(response.data.data.reverse());
//       } else {
//         toast.error('Failed to fetch orders');
//       }
//     } catch (err) {
//       console.error('Order fetch error:', err);
//       toast.error('Error fetching order data');
//     }
//   };

//   // ✅ Handle Order Status Change
//   const statusHandler = async (event, orderId) => {
//     const newStatus = event.target.value;
//     try {
//       const response = await axios.post(
//         `${url}/api/order/status`,
//         {
//           orderId,
//           status: newStatus,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         toast.success('Order status updated');
//         await fetchAllOrders(); // Refresh list
//       } else {
//         toast.error('Failed to update status');
//       }
//     } catch (err) {
//       console.error('Status update error:', err);
//       toast.error('Error updating status');
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="order add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="parcel" />
//             <div>
//               <p className="order-item-food">
//                 {/* ✅ Dynamic food list with ', ' separation */}
//                 {order.items.map((item, i) => `${item.name} x ${item.quantity}`).join(', ')}
//               </p>

//               <p className="order-item-name">
//                 {order.address.firstName} {order.address.lastName}
//                 {order.orderType === 'dinein' && ` (Table ${order.tableNumber})`}
//               </p>

//               <div className="order-item-address">
//                 <p>{order.address.street + ','}</p>
//                 <p>
//                   {order.address.city}, {order.address.state}, {order.address.country},{' '}
//                   {order.address.zipcode}
//                 </p>
//               </div>
//               <p className="order-item-phone">{order.address.phone}</p>
//             </div>

//             <p>Items: {order.items.length}</p>
//             <p>
//               {currency}
//               {order.amount}
//             </p>

//             <select
//               onChange={(e) => statusHandler(e, order._id)}
//               value={order.status}
//             >
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Order;

import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API;

  const fetchAllOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Unauthorized: Please login first.");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Order fetch error:', err);
      toast.error('Error fetching order data');
    }
  };

  const statusHandler = async (event, orderId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Unauthorized: Please login first.");
      return;
    }

    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success('Order status updated');
        await fetchAllOrders();
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item) => `${item.name} x ${item.quantity}`).join(', ')}
              </p>

              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
                {order.orderType === 'dinein' && ` (Table ${order.tableNumber})`}
              </p>

              <div className="order-item-address">
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country},{' '}
                  {order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>

            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
