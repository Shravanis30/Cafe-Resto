import React from 'react';
import './AdminDashboard.css';
import { FaDollarSign, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';

const featuredItems = [
    { name: "Creamy Cheese Burger", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=120&q=80" },
    { name: "Boneless Wings", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80" },
    { name: "Creamy Fries", img: "https://www.recipetineats.com/french-fries/" },
    { name: "Beef Whopper", img: "https://images.unsplash.com/photo-1559613290-e4bbf8468b72?auto=format&fit=crop&w=120&q=80" },
    { name: "Boneless Wings", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80" },
    { name: "Beef Whopper", img: "https://images.unsplash.com/photo-1559613290-e4bbf8468b72?auto=format&fit=crop&w=120&q=80" },
];

const popularItems = [
    { name: "Creamy Cheese Burger", price: 5.60, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80" },
    { name: "Boneless Wings", price: 5.60, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80" },
    { name: "Creamy Cheese Burger", price: 5.60, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80" },
    { name: "Mocha Cheese Combo", price: 5.60, img: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=format&fit=crop&w=80&q=80" },
    { name: "Orange Mojito", price: 5.60, img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2b?auto=format&fit=crop&w=80&q=80" },
    { name: "Peri Peri Fries", price: 5.60, img: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=80&q=80" }
];

const reservations = [
    { table: "T1", user: "Akash", amount: "₹500", status: "Pending", date: "22-07-2025" },
    { table: "T2", user: "Priya", amount: "₹650", status: "Confirmed", date: "22-07-2025" },
    { table: "T3", user: "John", amount: "₹800", status: "Paid", date: "22-07-2025" }
];

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-page">

            {/* DASHBOARD */}
            <div className="admin-dashboard">
                <div>
                    <p className="good-morning">Good Morning!</p>
                    <p className="admin-name">Shravani</p>
                </div>
                {/* Metrics */}
                <div className="dashboard-metrics">
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
                </div>

                {/* Items row */}
                <div className="dashboard-items-row">
                    <div className="dashboard-card-list">
                        <div className="dashboard-card-list-title">Featured Items</div>
                        <div className="dashboard-featured-list">
                            {featuredItems.map((f, i) => (
                                <div className="featured-item" key={i}>
                                    <img src={f.img} alt={f.name} />
                                    <span className="item-name">{f.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="dashboard-card-list">
                        <div className="dashboard-card-list-title">Most Popular Items</div>
                        <div className="dashboard-popular-list">
                            {popularItems.map((p, i) => (
                                <div className="popular-item" key={i}>
                                    <img src={p.img} alt={p.name} />
                                    <div>
                                        <div className="item-name">{p.name}</div>
                                        <div className="item-price">₹{p.price.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* EXPLORE MORE */}
            <section className="admin-explore-more">
                <h2 className="section-title">Explore More</h2>
                <div className="explore-links">
                    <button>Order Analytics</button>
                    <button>Reservation Reports</button>
                    <button>Customer Insights</button>
                    <button>Menu Manager</button>
                </div>
            </section>
            {/* RESERVATION TABLE REQUEST */}
            <section className="admin-reservation-table-section">
                <h2 className="section-title">Reservation Table Requests</h2>
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>Table</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Explore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((r, i) => (
                            <tr key={i}>
                                <td>{r.table}</td>
                                <td>{r.user}</td>
                                <td>{r.amount}</td>
                                <td className={`status-${r.status.toLowerCase()}`}>{r.status}</td>
                                <td>{r.date}</td>
                                <td><button className="explore-btn">Explore</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    );
};

export default AdminDashboard;
