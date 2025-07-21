// src/pages/Profile/Profile.jsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";
import {assets} from "../../assets/assets"; // Make sure this is the correct path to your uploaded image

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-image">
          <img src={assets.profile_image} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2 className="profile-name">
            Shravani Salunke <FaEdit className="edit-icon" />
          </h2>
          <p className="profile-info"><strong>Email:</strong> shravani@example.com</p>
          <p className="profile-info"><strong>Phone:</strong> +91 9876543210</p>
          <p className="profile-info"><strong>Address:</strong> Pune, Maharashtra, India</p>
          <button className="update-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
