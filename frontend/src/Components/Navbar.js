import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchUserData } from '../Redux/actions1'; 
import { useHistory } from 'react-router-dom';
import './Navbar.css';
import Dropdown from 'react-bootstrap/Dropdown';

const NavBar = () => {
    
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
//   const user = {"name":"Mohit"};
  console.log("navbar",user);
 

 
  return (
      // Conditional rendering or provide a default value
      
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
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2">feedback</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
      </div>
      </div>
  </nav>
  
   
      
  );
};

export default NavBar;