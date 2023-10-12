import React from 'react';
import { Link } from 'react-router-dom';
import CommonNavbar from './CommonNavbar';


const ContactUs = () => {
  return (
    <div>
      <CommonNavbar/>
    <div style = {{color: "white", marginTop: "30px"}}>
      <h2>Contact Us</h2>
      <p>If you have any questions or need assistance, please feel free to contact us using the information below:</p>

      <div>
        <h4>Our Contact Information</h4>
        <p>Email: contact@natwest-bank.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Address: 123 Bank Street, City, Country</p>
      </div>

      <div>
        <h4 style={{marginBottom: "30px"}}>Contact Form</h4>
        <form>
          <div className="form-group">
            <input type="text" placeholder='Enter your name' id="name" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <input type="email" placeholder='Enter your email' id="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <textarea id="message" placeholder='Description' name="message" className="form-control" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/"  className='btn btn-danger mx-2'>Cancel</Link>

        </form>
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
    </div>
  );
};

export default ContactUs;
