import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sales.css';

const Sales = () => {
  const [paidOnline, setPaidOnline] = useState([]);
  const [paidCod, setPaidCod] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/api/order/list`)
      .then(res => {
        const orders = res.data.data;
        const online = orders.filter(o => o.payment === true && o.paymentId); // Online
        const cod = orders.filter(o => o.payment === true && !o.paymentId);   // COD
        setPaidOnline(online);
        setPaidCod(cod);
      });
  }, []);

  const renderOrderRow = (o) => (
    <tr key={o._id}>
      <td>{o.userId}</td>
      <td>{o.amount}</td>
      <td>{new Date(o.date).toLocaleDateString()}</td>
      <td>{o.paymentId || "COD"}</td>
    </tr>
  );

  return (
    <div className="sales-page">
      <h2>Total Sales</h2>

      <div className="sales-section">
        <h3>📱 Online Payments</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>{paidOnline.map(renderOrderRow)}</tbody>
        </table>
      </div>
      
      <div className="sales-section">
        <h3>💸 Cash On Delivery</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>{paidCod.map(renderOrderRow)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
