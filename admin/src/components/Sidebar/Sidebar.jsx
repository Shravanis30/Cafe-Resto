import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { MdAddBox, MdListAlt, MdReceiptLong, MdTableRestaurant } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <MdAddBox className="sidebar-icon" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <MdListAlt className="sidebar-icon" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <MdReceiptLong className="sidebar-icon" />
          <p>Orders</p>
        </NavLink>

        <NavLink to='/reservations' className="sidebar-option reservation-section">
          <MdTableRestaurant className="sidebar-icon" />
          <p>Table Reservations</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
