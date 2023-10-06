
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/actions1';
import NavBar from './Navbar';
import { useSelector } from 'react-redux';
import { fetchUserData } from '../Redux/actions1';
import { PrivacyandCookies } from './Privacy ';
import { useHistory } from 'react-router-dom';

const Profile = () => {
 
  


  return (
    <div>
      <NavBar />


      <div className="d-flex justify-content-between flex-wrap mt-4">
        <div class="card mb-3 text-centre mt-5" style={{ border: 'none' }}>
          <img className="card-img-top mx-auto" src="https://cdn-icons-png.flaticon.com/512/10149/10149661.png" alt="Card image cap" style={{ width: '150px', height: '150px' }} />
          <div className="card-body">
            <a href="/transactions" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Transaction History</a>
          </div>
        </div>
        <div className="card text-center mt-5" style={{ border: 'none' }}>
          <img className="card-img-top mx-auto" src="https://cdn-icons-png.flaticon.com/128/8216/8216067.png" alt="Card image cap" style={{ width: '150px', height: '150px' }} />
          <div className="card-body">
            <a href="/transfer" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Money transfer</a>
          </div>
        </div>
        <div className="card text-center mt-5" style={{ border: 'none' }} >
          <img className="card-img-top mx-auto" src="https://us.123rf.com/450wm/arhimicrostok/arhimicrostok1705/arhimicrostok170504966/78192006-vector-credit-cards-icon-flat-design-style.jpg?ver=6" alt="Card image cap" style={{ width: '150px', height: '150px' }} />
          <div className="card-body">
            <a href="/creditcard" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Credit card activities</a>
          </div>
        </div>
        <div className="card text-center mt-5" style={{ border: 'none' }} >
          <img className="card-img-top mx-auto" src="https://i.pngimg.me/thumb/f/720/comvecteezy289158.jpg" alt="Card image cap" style={{ width: '150px', height: '150px' }} />
          <div className="card-body">
            <a href="#" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Loan</a>
          </div>
        </div>

        <div className="card text-center mt-5" style={{ border: 'none' }}>
          <img className="card-img-top mx-auto" src="https://i.pinimg.com/564x/d6/9c/a6/d69ca61689da7c22d563df221eaa7a5b.jpg" alt="Card image cap" style={{ width: '150px', height: '150px' }} />
          <div className="card-body">
            <a href="#" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Insurance</a>
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

              <a href="/Privacy">Privacy and Cookies</a>
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

export default Profile;
