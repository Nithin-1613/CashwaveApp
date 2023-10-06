// Login.js (Component)
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../Redux/actions1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

 
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ emailid: '', security_PIN: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make an HTTP request to your server (JSON Server in this case) with email and password
      const response = await axios.post('http://localhost:8081/userservice/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        const user =response.data;
        console.log(user);
        // Dispatch an action to update the user's authentication state
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(fetchUserData(formData.emailid, formData.security_PIN));
        navigate("/profile");
      } else {
        // Handle login error, show an error message, etc.
        alert('Please enter valid details');
        console.error('Login failed')
        
        
      }
    } catch (error) {
      alert('Please enter valid details');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
     <nav class="navbar">
        <div class="navbar-logo">
            <a href="#">
                <img src="https://www.fintechfutures.com/files/2023/02/Natwest.png" width="50" height="50" alt="Brand Logo"/>
            </a>
        </div>
        <div class="navbar-links">
            <a href="/">Home</a>
            
        </div>
        <div class="navbar-space"></div>
        
    </nav>
    <div class="content">
    <div class="right-column">
        <div class="quote">
            <h3>Welcome to Natwest Banking</h3>
            <h1>LOGIN</h1>
           
        
        </div>
        </div>
        <div class="left column">
        <div class="center-container">
        <div class="login-box">
        <form className="login-form" onSubmit={handleLogin}>
            <input
              type="emailid"
              name="emailid"
              placeholder="Email"
              value={formData.emailid}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="security_PIN"
              placeholder="security PIN"
              value={formData.security_PIN}
              onChange={handleInputChange}
            />
            <button type="submit">Login</button>
          </form>
          </div>
          </div>
        </div>
        
        </div>
      <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>

<footer class="footer">
        <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>
  <div class="left-section">
    <div class="footer-links">
      <a href="/contact-us">Contact Us</a>
       
      <a href="/privacy-cookies">Privacy and Cookies</a>
      <a href="/get-our-app">Get Our App</a>
      <div class="copyright">
      &copy; 2023 NatwestBank.com
    </div>
    </div>
   
  </div>
  <div class="right-section">
  <div class="footer-links">
  <div class="social-icon-box" style={{ backgroundColor: '#1877f2' }}><a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a></div>
      <div class="social-icon-box" style={{ backgroundColor: '#1da1f2' }}><a href="#" class="social-icon"><i class="fab fa-twitter"></i></a></div>
      <div class="social-icon-box" style={{ backgroundColor: '#c32aa3' }}><a href="#" class="social-icon"><i class="fab fa-instagram"></i></a></div>
    </div>
    
  </div>
</footer>
    </div>
  );
  
};

export default Login;


