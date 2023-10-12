// Login.js (Component)
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../Redux/actions1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Navbar.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './Navbar';
import CommonNavbar from './CommonNavbar';


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
      if (formData.emailid == "admin@gmail.com" && formData.security_PIN == "1947") {
        navigate("/admin");
      }
      else {
        const response = await axios.post('http://localhost:8081/users/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          const user = response.data;
          if (user.block == 0) {
            // Dispatch an action to update the user's authentication state
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(fetchUserData(formData.emailid, formData.security_PIN));
            navigate("/profile");
          } else {
            alert('Account is blocked');
          }
        } else {
          // Handle login error, show an error message, etc.
          alert('Please enter valid details');
          console.error('Login failed')


        }
      }
    } catch (error) {
      alert('Please enter valid details');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <CommonNavbar/>
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6  loginformrow offset-md-3 mt-4" style = {{textAlign: "center"}}>
            <div className="tquote text-center">
            <h2 className=" mb-4"> Login </h2>
            </div>
            <div className="login-box" style = {{marginLeft: "25px"}}>
              <form className="login-form" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="emailid"
                    className="form-control"
                    name="emailid"
                    placeholder="Email"
                    value={formData.emailid}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="security_PIN"
                    placeholder="security PIN"
                    value={formData.security_PIN}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-3 text-center login-functions">
                  <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <Footer />
    </div>
  );

};

export default Login;


