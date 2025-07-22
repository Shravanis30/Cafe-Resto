import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReservation.css';


const BASE_URL = import.meta.env.VITE_API || 'https://cafe-resto-production.up.railway.app';


const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [tableName, setTableName] = useState('');
  const [creating, setCreating] = useState(false);

  const token = localStorage.getItem("token"); // ✅ Get token directly from localStorage

  useEffect(() => {
    fetchReservations();
  }, []);

  
  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/reservation/admin/all`);
      setReservations(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    if (!tableName.trim()) return;

    setCreating(true);
    try {
      await axios.post(
        `${BASE_URL}/api/reservation/admin/table/create`,
        { name: tableName }
      );
      alert("Table created successfully!");
      setTableName("");
      fetchReservations();
    } catch (error) {
      alert("Failed to create table");
    } finally {
      setCreating(false);
    }
  };


  return (
    <div className="admin-reservations">
      <h2 className="admin-title">All Reservations</h2>

      <div className="table-container">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Table</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res._id}>
                  <td>{res.table?.name || 'N/A'}</td>
                  <td>{res.userId?.name || res.userId?.email || 'Unknown'}</td>
                  <td>₹{(res.amount / 100).toFixed(2)}</td>
                  <td className={`status ${res.status.toLowerCase()}`}>{res.status}</td>
                  <td>{new Date(res.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-reservations">No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Add Table Creation Section */}
      <div className="add-table-form">
        <h3>Add New Table</h3>
        <form onSubmit={handleCreateTable}>
          <input
            type="text"
            placeholder="Enter table name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <button type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Add Table'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminReservation;
