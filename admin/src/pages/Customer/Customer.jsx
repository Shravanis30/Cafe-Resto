import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/api/user/all`)
      .then(res => setCustomers(res.data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="customer-page">
      <h2>All Registered Customers</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
