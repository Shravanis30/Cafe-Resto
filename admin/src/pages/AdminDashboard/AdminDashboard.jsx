// import React, { useEffect, useState } from 'react';
// import './AdminDashboard.css';
// import { useNavigate } from 'react-router-dom';
// import { FaDollarSign, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [deliveryOrders, setDeliveryOrders] = useState([]);
//   const [diningOrders, setDiningOrders] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const orderRes = await axios.get(`${import.meta.env.VITE_API}/api/order/list`);
//       const orders = orderRes.data.data || [];

//       const delivery = orders
//         .filter((o) => o.orderType === 'delivery')
//         .slice(-3)
//         .reverse();

//       const dining = orders
//         .filter((o) => o.orderType === 'dinein' || o.tableNumber !== null)
//         .slice(-3)
//         .reverse();

//       const reservationRes = await axios.get(`${import.meta.env.VITE_API}/api/reservation/admin/all`);
//       const reservationList = reservationRes.data.data || [];

//       setDeliveryOrders(delivery);
//       setDiningOrders(dining);
//       setReservations(reservationList.slice(-3).reverse());
//     } catch (err) {
//       console.error('Failed to fetch admin dashboard data', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="admin-dashboard-page">
//       <div className="admin-dashboard">
//         <div>
//           <p className="good-morning">Good Morning!</p>
//           <p className="admin-name">Shravani</p>
//         </div>

//         {/* Metrics */}
//         <div className="dashboard-metrics">
//           <div className="dashboard-card orange">
//             <FaDollarSign size={24} />
//             <div>
//               <div className="card-title">Total Sales</div>
//               <div className="card-value">₹32,540</div>
//             </div>
//           </div>
//           <div className="dashboard-card orange-light">
//             <FaShoppingCart size={24} />
//             <div>
//               <div className="card-title">Total Orders</div>
//               <div className="card-value">940</div>
//             </div>
//           </div>
//           <div className="dashboard-card orange-outline">
//             <FaUsers size={24} />
//             <div>
//               <div className="card-title">Total Customers</div>
//               <div className="card-value">720</div>
//             </div>
//           </div>
//           <div className="dashboard-card orange-gradient">
//             <FaUtensils size={24} />
//             <div>
//               <div className="card-title">Total Menu Items</div>
//               <div className="card-value">37</div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders Section */}
//         <div className="dashboard-items-row">
//           <div className="dashboard-card-list full-width">
//             <div className="dashboard-card-list-header">
//               <div className="dashboard-card-list-title">Recent Dining Orders</div>
//               <button className="view-more" onClick={() => navigate('/orders')}>View More</button>
//             </div>
//             <div className="order-list">
//               {diningOrders.map(order => (
//                 <div key={order._id} className="order-item">
//                   <div><strong>User:</strong> {order.userId?.name || order.userId}</div>
//                   <div><strong>Table:</strong> {order.tableNumber || 'N/A'}</div>
//                   <div><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</div>
//                   <div><strong>Amount:</strong> ₹{order.amount}</div>
//                   <div><strong>Status:</strong> {order.payment ? 'Paid' : 'Unpaid'}</div>
//                   <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="dashboard-card-list full-width">
//             <div className="dashboard-card-list-header">
//               <div className="dashboard-card-list-title">Recent Delivery Orders</div>
//               <button className="view-more" onClick={() => navigate('/orders')}>View More</button>
//             </div>
//             <div className="order-list">
//               {deliveryOrders.map(order => (
//                 <div key={order._id} className="order-item">
//                   <div><strong>User:</strong> {order.userId?.name || order.userId}</div>
//                   <div><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</div>
//                   <div><strong>Amount:</strong> ₹{order.amount}</div>
//                   <div><strong>Status:</strong> {order.payment ? 'Paid' : 'Unpaid'}</div>
//                   <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Explore */}
//       <section className="admin-explore-more">
//         <h2 className="section-title">Explore More</h2>
//         <div className="explore-links">
//           <button>Order Analytics</button>
//           <button>Reservation Reports</button>
//           <button>Customer Insights</button>
//           <button>Menu Manager</button>
//         </div>
//       </section>

//       {/* Reservation Table */}
//       <section className="admin-reservation-table-section">
//         <div className="dashboard-card-list-header">
//           <h2 className="section-title">Reservation Table Requests</h2>
//           <button className="view-more" onClick={() => navigate('/reservation')}>Explore More</button>
//         </div>
//         <table className="reservation-table">
//           <thead>
//             <tr>
//               <th>Table</th>
//               <th>User</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservations.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.table?.name || 'N/A'}</td>
//                 <td>{r.userId?.name || 'User'}</td>
//                 <td>₹{r.amount}</td>
//                 <td className={`status-${r.status?.toLowerCase()}`}>{r.status}</td>
//                 <td>{new Date(r.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [diningOrders, setDiningOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [usersById, setUsersById] = useState({});
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalMenuItems: 0,
    });

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const orderRes = await axios.get(`${import.meta.env.VITE_API}/api/order/list`);
            const orders = orderRes.data.data || [];

            // Unique userIds
            const userIds = [...new Set(orders.map((o) => o.userId))];

            // Fetch user profiles
            const userPromises = userIds.map((id) =>
                axios.get(`${import.meta.env.VITE_API}/api/user/profile/${id}`).then(res => ({
                    id,
                    name: res.data?.user?.name || 'User',
                }))
            );
            const userResults = await Promise.all(userPromises);
            const userMap = {};
            userResults.forEach((user) => {
                userMap[user.id] = user.name;
            });
            setUsersById(userMap);

            const delivery = orders
                .filter((o) => o.orderType === 'delivery')
                .slice(-3)
                .reverse();

            const dining = orders
                .filter((o) => o.orderType === 'dinein' || o.tableNumber !== null)
                .slice(-3)
                .reverse();

            const reservationRes = await axios.get(`${import.meta.env.VITE_API}/api/reservation/admin/all`);
            const reservationList = reservationRes.data.data || [];

            setDeliveryOrders(delivery);
            setDiningOrders(dining);
            setReservations(reservationList.slice(-3).reverse());
        } catch (err) {
            console.error('Failed to fetch admin dashboard data', err);
        }

        // Get all real-time metrics
        const [ordersRes, usersRes, foodStatsRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API}/api/order/list`),
            axios.get(`${import.meta.env.VITE_API}/api/user/all`),
            axios.get(`${import.meta.env.VITE_API}/api/food/stats`),
        ]);


        const allOrders = ordersRes.data?.data || [];
        const totalSales = allOrders
            .filter(order => order.payment)
            .reduce((sum, order) => sum + order.amount, 0);

        setStats({
            totalSales,
            totalOrders: allOrders.length,
            totalCustomers: usersRes.data?.data?.length || 0,
            totalMenuItems: foodStatsRes.data?.totalMenuItems || 0,
        });

    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getUserName = (userId) => usersById[userId] || "User";

    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard">
                {/* Greeting */}
                <div>
                    <p className="good-morning">Good Morning!</p>
                    <p className="admin-name">Shravani</p>
                </div>

                {/* Metric cards */}
                {/* <div className="dashboard-metrics">
                    <div className="dashboard-card orange">
                        <FaDollarSign size={24} />
                        <div>
                            <div className="card-title">Total Sales</div>
                            <div className="card-value">₹32,540</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-light">
                        <FaShoppingCart size={24} />
                        <div>
                            <div className="card-title">Total Orders</div>
                            <div className="card-value">940</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-outline">
                        <FaUsers size={24} />
                        <div>
                            <div className="card-title">Total Customers</div>
                            <div className="card-value">720</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-gradient">
                        <FaUtensils size={24} />
                        <div>
                            <div className="card-title">Total Menu Items</div>
                            <div className="card-value">37</div>
                        </div>
                    </div>
                </div> */}

                {/* Metric cards */}
                <div className="dashboard-metrics">
                    <div className="dashboard-card orange" onClick={() => navigate('/sales')}>
                        <FaDollarSign size={24} />
                        <div>
                            <div className="card-title">Total Sales</div>
                            <div className="card-value">₹{stats.totalSales}</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-light" onClick={() => navigate('/orders')}>
                        <FaShoppingCart size={24} />
                        <div>
                            <div className="card-title">Total Orders</div>
                            <div className="card-value">{stats.totalOrders}</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-outline" onClick={() => navigate('/customers')}>
                        <FaUsers size={24} />
                        <div>
                            <div className="card-title">Total Customers</div>
                            <div className="card-value">{stats.totalCustomers}</div>
                        </div>
                    </div>
                    <div className="dashboard-card orange-gradient" onClick={() => navigate('/list')}>
                        <FaUtensils size={24} />
                        <div>
                            <div className="card-title">Total Menu Items</div>
                            <div className="card-value">{stats.totalMenuItems}</div>
                        </div>
                    </div>
                </div>


                {/* Orders Lists (dine-in & delivery) */}
                <div className="dashboard-items-row">
                    <div className="dashboard-card-list full-width">
                        <div className="dashboard-card-list-header">
                            <div className="dashboard-card-list-title">Recent Dining Orders</div>
                            <button className="view-more" onClick={() => navigate('/orders')}>View More</button>
                        </div>
                        <div className="order-list">
                            {diningOrders.map(order => (
                                <div key={order._id} className="order-item">
                                    <div><strong>User:</strong> {getUserName(order.userId)}</div>
                                    <div><strong>Table:</strong> {order.tableNumber || 'N/A'}</div>
                                    <div><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</div>
                                    <div><strong>Amount:</strong> ₹{order.amount}</div>
                                    <div><strong>Status:</strong> {order.payment ? 'Paid' : 'Unpaid'}</div>
                                    <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Orders */}
                    <div className="dashboard-card-list full-width">
                        <div className="dashboard-card-list-header">
                            <div className="dashboard-card-list-title">Recent Delivery Orders</div>
                            <button className="view-more" onClick={() => navigate('/orders')}>View More</button>
                        </div>
                        <div className="order-list">
                            {deliveryOrders.map(order => (
                                <div key={order._id} className="order-item">
                                    <div><strong>User:</strong> {getUserName(order.userId)}</div>
                                    <div><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</div>
                                    <div><strong>Amount:</strong> ₹{order.amount}</div>
                                    <div><strong>Status:</strong> {order.payment ? 'Paid' : 'Unpaid'}</div>
                                    <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Explore & Reservation Table unchanged */}
                <section className="admin-reservation-table-section">
                    <div className="dashboard-card-list-header">
                        <h2 className="section-title">Reservation Table Requests</h2>
                        <button className="view-more" onClick={() => navigate('/reservation')}>Explore More</button>
                    </div>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th>Table</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.table?.name || 'N/A'}</td>
                                    <td>{r.userId?.name || 'User'}</td>
                                    <td>₹{r.amount}</td>
                                    <td className={`status-${r.status?.toLowerCase()}`}>{r.status}</td>
                                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
