import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import EditProfileForm  from './EditProfileform';



const PersonalInfo = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user);
  
    const containerStyle = {
      maxWidth: '600px', // Example style properties
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      
    };
  
    const paragraphStyle = {
      fontSize: '18px',
      margin: '10px 0',
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
          <a href="/Profile">Dashboard</a>
      </div>
      <div class="navbar-space"></div>
      <div class="navbar-user">
          <div class="row">
              <div class="col-auto">
                  {user ? (
                      <h1>Welcome, {user.name}!</h1>
                  ) : (
                      <h1>Loading...</h1> // or provide an error message
                  )}
              </div>
              <div class="col-auto">
              <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" width="50" height="50"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        
        
        <Dropdown.Item href="#/action-2">feedback</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
      </div>
      </div>
  </nav>
      <div style={containerStyle}>
        <h1>Personal Information</h1>
        <p style={paragraphStyle}>Name: {user.name}</p>
        <p style={paragraphStyle}>Email: {user.emailid}</p>
        <p style={paragraphStyle}>Aadharcardnumber: {user.aadharcardnumber}</p>
        <p style={paragraphStyle}>Mobile Number: {user.mobilenumber}</p>
        <p style={paragraphStyle}>Date of birth: {user.dateofbirth}</p>
        <p style={paragraphStyle}>UPI ID: {user.upi_ID}</p>
        <Link to="/EditProfileform">
        <button >Edit</button>
       </Link>
      </div>
      </div>
    );
  };
  export default PersonalInfo;
