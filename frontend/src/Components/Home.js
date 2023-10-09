import React from 'react';
import { Link } from 'react-router-dom';
import Contact from './contact-us';
import './Navbar.css';
import Register from './Registration';
import ForgotPassword from './Forgotpassword';

const Home = () => {
  return (
    
    <div>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
/>

<nav class="navbar">
        <div class="navbar-logo">
            <a href="#">
                <img src="https://www.fintechfutures.com/files/2023/02/Natwest.png" width="50" height="50" alt="Brand Logo"/>
            </a>
        </div>
        <div class="navbar-links">
            <a href="https://www.natwestgroup.com/who-we-are.html">About</a>
            <a href="contact-us">Help and Support</a>
        </div>
        <div class="navbar-space"></div>
        <div class="navbar-search">
            <input type="text" placeholder="Search"/>
            <button>Search</button>
        </div>
    </nav>
<div>
    <div class="content">
    <div class="right-column">
        <div class="quote">
            <h2>Natwest</h2>
            <p>"We’re here to champion your potential"</p>
        
        </div>
        </div>
        <div class="left column">
            <img src="https://www.globalbankingandfinance.com/wp-content/uploads/2021/04/Bank-of-2030.jpg" alt="Image Description" height="100%"/>
        </div>
        
        </div>
        <div class="bottom-content">
        <div class="buttons">
            <button className='login'><Link to="/login" className="text-white">Login</Link></button>
            <button >
            <Link to="/register" className="text-white">Register</Link></button>
        </div>
        </div>
        </div>
    
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

export default Home;
