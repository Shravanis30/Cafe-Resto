import React, { useState } from 'react';
import './LoginPopup.css';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const url = import.meta.env.VITE_API || 'http://localhost:5000';

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const endpoint = currState === 'Login' ? '/api/admin/login' : '/api/admin/register';

    try {
      const response = await axios.post(`${url}${endpoint}`, data);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('adminToken', token);

        const res = await axios.get(`${url}/api/admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          localStorage.setItem('adminUser', JSON.stringify(res.data.user));
          toast.success(currState === 'Login' ? 'Login successful!' : 'Account created!');
          setShowLogin(false);
        } else {
          toast.error('Failed to fetch admin info');
        }
      } else {
        toast.error(response.data.message || 'Login/Register failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <AiOutlineClose
            className="login-popup-close-icon"
            onClick={() => setShowLogin(false)}
          />
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

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
