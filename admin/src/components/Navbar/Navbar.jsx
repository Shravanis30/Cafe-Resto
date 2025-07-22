// import React, { useEffect, useRef, useState } from 'react';
// import { assets } from '../../assets/assets';
// import './Navbar.css';
// import { FaBell, FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import notifySound from '../../assets/notify.mp3'; // Put your MP3 here

// const AdminNavbar = () => {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const audioRef = useRef(null);
//   const hasPlayedRef = useRef(false); // prevent sound repeat
//   const [hasInteracted, setHasInteracted] = useState(false);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API}/api/notifications`);
//       if (res?.data?.success && res.data.data.length > 0) {
//         const newNotifs = res.data.data;

//         // play sound only if new ones come + user interacted
//         if (newNotifs.length !== notifications.length && hasInteracted && audioRef.current) {
//           if (!hasPlayedRef.current) {
//             audioRef.current.play().catch((err) => {
//               console.warn("Autoplay blocked:", err.message);
//             });
//             hasPlayedRef.current = true;
//           }
//         }

//         setNotifications(newNotifs);
//       }
//     } catch (err) {
//       console.error("Failed to load notifications", err);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.patch(`${import.meta.env.VITE_API}/api/notifications/${notificationId}/read`);
//       setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
//     } catch {
//       alert("Failed to update notification");
//     }
//   };

//   // Enable audio on first user interaction
//   useEffect(() => {
//     const enableAudio = () => {
//       setHasInteracted(true);
//       hasPlayedRef.current = false; // reset sound trigger
//       document.removeEventListener('click', enableAudio);
//     };

//     document.addEventListener('click', enableAudio);

//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

//     return () => {
//       document.removeEventListener('click', enableAudio);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="navbar">
//       <div className="navbar-left" onClick={() => navigate('/')}>
//         <img src={assets.logo} alt="Logo" className="navbar-logo" />
//         <h2 className="dashboard-title">Admin Dashboard</h2>
//       </div>

//       <div className="navbar-right">
//         <div className="bell-icon" onClick={() => setShowDropdown(!showDropdown)}>
//           <FaBell size={21} />
//           {notifications.length > 0 && (
//             <div className="notif-dot">{notifications.length}</div>
//           )}
//         </div>

//         {showDropdown && (
//           <div className="notif-dropdown">
//             {notifications.length === 0 && (
//               <p className="empty">No new notifications</p>
//             )}
//             {notifications.map((n) => (
//               <div className="notif-item" key={n._id}>
//                 <span>{n.message}</span>
//                 <FaCheckCircle
//                   className="mark-read"
//                   onClick={() => markAsRead(n._id)}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ✅ Hidden audio element */}
//         <audio ref={audioRef} src={notifySound} preload="auto" />

//         <img
//           className="profile"
//           src={assets.profile_image}
//           alt="Profile"
//           onClick={() => navigate('/profile')}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminNavbar;



import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const prevNotifIdsRef = useRef(new Set());

  const handleUserInteraction = () => {
    setHasInteracted(true);
    document.removeEventListener('click', handleUserInteraction);
  };

  useEffect(() => {
    // Wait for user interaction to unlock audio
    document.addEventListener('click', handleUserInteraction);
    fetchNotifications(); // Load once
    const interval = setInterval(fetchNotifications, 15000);
    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/api/notifications`);
      const newData = res.data.data || [];

      const newNotifIds = newData.map((n) => n._id);
      const newOnes = newNotifIds.filter((id) => !prevNotifIdsRef.current.has(id));

      if (newOnes.length > 0 && hasInteracted && audioRef.current) {
        audioRef.current.pause();        // force reset
        audioRef.current.currentTime = 0;
        audioRef.current.load();         // always load fresh
        const promise = audioRef.current.play();
        if (promise !== undefined) {
          promise.catch(err =>
            console.warn("🔇 Autoplay blocked or failed:", err.message)
          );
        }
      }

      // Update notifications + new IDs
      setNotifications(newData);
      prevNotifIdsRef.current = new Set(newNotifIds);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const markAsRead = async (notifId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API}/api/notifications/${notifId}/read`);
      const updated = notifications.filter((n) => n._id !== notifId);
      setNotifications(updated);
      prevNotifIdsRef.current.delete(notifId);
    } catch {
      alert("Unable to mark notification as read");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        <img src={assets.logo} alt="Logo" className="navbar-logo" />
        <h2 className="dashboard-title">Admin Dashboard</h2>
      </div>

      <div className="navbar-right">
        {/* Notification Bell */}
        <div className="bell-icon" onClick={() => setShowDropdown(!showDropdown)}>
          <FaBell size={21} />
          {notifications.length > 0 && (
            <div className="notif-dot">{notifications.length}</div>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="notif-dropdown">
            {notifications.length === 0 ? (
              <p className="empty">No new notifications</p>
            ) : (
              notifications.map((n) => (
                <div className="notif-item" key={n._id}>
                  <span>{n.message}</span>
                  <FaCheckCircle
                    className="mark-read"
                    onClick={() => markAsRead(n._id)}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* 🔊 Audio */}
        <audio
          ref={audioRef}
          preload="auto"
          src="/assets/notify.mp3" // must be in public folder
        />

        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
