// // import React, { useContext, useState } from 'react'
// // import './LoginPopup.css'
// // import { assets } from '../../assets/assets'
// // import { StoreContext } from '../../Context/StoreContext'
// // import axios from 'axios'
// // import { toast } from 'react-toastify'

// // const LoginPopup = ({ setShowLogin }) => {

// //     const { setToken, url, loadCartData } = useContext(StoreContext)
// //     const [currState, setCurrState] = useState("Sign Up");

// //     const [data, setData] = useState({
// //         name: "",
// //         email: "",
// //         password: ""
// //     })

// //     const onChangeHandler = (event) => {
// //         const name = event.target.name
// //         const value = event.target.value
// //         setData(data => ({ ...data, [name]: value }))
// //     }

// //     // const onLogin = async (e) => {
// //     //     e.preventDefault()

// //     //     let new_url = url;
// //     //     if (currState === "Login") {
// //     //         new_url += "/api/user/login";
// //     //     }
// //     //     else {
// //     //         new_url += "/api/user/register"
// //     //     }
// //     //     const response = await axios.post(new_url, data);
// //     //     if (response.data.success) {
// //     //         setToken(response.data.token)
// //     //         localStorage.setItem("token", response.data.token)
// //     //         loadCartData({token:response.data.token})
// //     //         setShowLogin(false)
// //     //     }
// //     //     else {
// //     //         toast.error(response.data.message)
// //     //     }
// //     // }


// //     const onLogin = async (e) => {
// //         e.preventDefault();

// //         let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

// //         try {
// //             const response = await axios.post(url + endpoint, data);
// //             if (response.data.success) {
// //                 const token = response.data.token;
// //                 setToken(token);
// //                 localStorage.setItem("token", token);

// //                 // Get user data (optional: you can call a /me route, or decode JWT)
// //                 const res = await axios.get(`${url}/api/user/me`, {
// //                     headers: { Authorization: `Bearer ${token}` }
// //                 });

// //                 if (res.data.success) {
// //                     const userData = res.data.user;
// //                     localStorage.setItem("user", JSON.stringify(userData));
// //                     // Set context
// //                     loadCartData(); // token is already in context
// //                     setShowLogin(false);
// //                 } else {
// //                     toast.error("Failed to fetch user info");
// //                 }
// //             } else {
// //                 toast.error(response.data.message);
// //             }
// //         } catch (err) {
// //             console.error("Login error:", err);
// //             toast.error("Something went wrong. Please try again.");
// //         }
// //     };


// //     return (
// //         <div className='login-popup'>
// //             <form onSubmit={onLogin} className="login-popup-container">
// //                 <div className="login-popup-title">
// //                     <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
// //                 </div>
// //                 <div className="login-popup-inputs">
// //                     {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
// //                     <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
// //                     <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
// //                 </div>
// //                 <button>{currState === "Login" ? "Login" : "Create account"}</button>
// //                 <div className="login-popup-condition">
// //                     <input type="checkbox" name="" id="" required />
// //                     <p>By continuing, i agree to the terms of use & privacy policy.</p>
// //                 </div>
// //                 {currState === "Login"
// //                     ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
// //                     : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
// //                 }
// //             </form>
// //         </div>
// //     )
// // }

// // export default LoginPopup




// import React, { useContext, useState } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const LoginPopup = ({ setShowLogin }) => {
//   const { setToken, url, loadCartData } = useContext(StoreContext);
//   const [currState, setCurrState] = useState('Sign Up');
//   const [data, setData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onLogin = async (e) => {
//     e.preventDefault();
//     const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';

//     try {
//       const response = await axios.post(`${url}${endpoint}`, data);

//       if (response.data.success) {
//         const token = response.data.token;
//         setToken(token);
//         localStorage.setItem('token', token);

//         // Fetch user info
//         const res = await axios.get(`${url}/api/user/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.data.success) {
//           localStorage.setItem('user', JSON.stringify(res.data.user));
//           loadCartData(); // token is already set in context
//           toast.success(currState === "Login" ? "Login successful!" : "Account created!");
//           setShowLogin(false);
//         } else {
//           toast.error('Failed to fetch user info');
//         }
//       } else {
//         toast.error(response.data.message || 'Login/Register failed');
//       }
//     } catch (err) {
//       console.error('Login/Register error:', err);
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt="Close"
//           />
//         </div>

//         <div className="login-popup-inputs">
//           {currState === 'Sign Up' && (
//             <input
//               name="name"
//               type="text"
//               placeholder="Your name"
//               value={data.name}
//               onChange={onChangeHandler}
//               required
//             />
//           )}
//           <input
//             name="email"
//             type="email"
//             placeholder="Your email"
//             value={data.email}
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={data.password}
//             onChange={onChangeHandler}
//             required
//           />
//         </div>

//         <button type="submit">
//           {currState === 'Login' ? 'Login' : 'Create Account'}
//         </button>

//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>
//             By continuing, I agree to the terms of use & privacy policy.
//           </p>
//         </div>

//         {currState === 'Login' ? (
//           <p>
//             Create a new account?{' '}
//             <span onClick={() => setCurrState('Sign Up')}>Click here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{' '}
//             <span onClick={() => setCurrState('Login')}>Login here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;



import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';

    try {
      const res = await axios.post(`${url}${endpoint}`, data);
      const { success, token, message } = res.data;

      if (!success || !token) {
        toast.error(message || 'Authentication failed');
        return;
      }

      // Store token
      setToken(token);
      localStorage.setItem('token', token);

      // Fetch user info
      const userRes = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userRes.data.success) {
        localStorage.setItem('user', JSON.stringify(userRes.data.user));
        loadCartData(); // Sync cart
        toast.success(currState === 'Login' ? 'Login successful!' : 'Account created!');
        setShowLogin(false);
      } else {
        toast.error('Failed to load user data.');
      }
    } catch (err) {
      console.error('Login/Register error:', err);
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === 'Login' ? 'Login' : 'Create Account'}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          {currState === 'Login' ? (
            <>
              Create a new account?{' '}
              <span onClick={() => setCurrState('Sign Up')}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setCurrState('Login')}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
