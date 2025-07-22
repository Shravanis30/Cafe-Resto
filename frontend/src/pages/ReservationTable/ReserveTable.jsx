import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ReserveTable.css';
import { StoreContext } from '../../Context/StoreContext';

const BASE_URL = import.meta.env.VITE_API || 'https://cafe-resto-production.up.railway.app';

const ReserveTable = () => {
  const { token } = useContext(StoreContext);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [members, setMembers] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/reservation/tables`);
      setTables(res.data.tables || []);
    } catch (err) {
      toast.error('Failed to load tables');
    }
  };


  const handleReserve = async () => {
    if (!selectedTable || members < 1) return toast.warn('Please select a table and number of members');

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/reservation/book`, // ✅ Fixed endpoint
        { tableId: selectedTable },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.session_url;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Reservation failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="reserve-container">
      <h2>Reserve Your Table</h2>
      <form className="reservation-form" onSubmit={(e) => { e.preventDefault(); handleReserve(); }}>
        <div className="form-group">
          <label>Select Table:</label>
          <div className="table-layout">
            {tables.map((table) => (
              <div
                key={table._id}
                className={`table-box ${table.status} ${selectedTable === table._id ? 'selected' : ''}`}
                onClick={() => table.status === 'available' && setSelectedTable(table._id)}
              >
                {table.name}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Number of Members:</label>
          <input
            type="number"
            min="1"
            value={members}
            onChange={(e) => setMembers(parseInt(e.target.value) || 1)}
            required
          />
        </div>
        <button className="reserve-button" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay & Reserve'}
        </button>
      </form>
    </div>
  );
};

export default ReserveTable;