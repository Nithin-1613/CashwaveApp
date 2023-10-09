
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/actions1';
import NavBar from './Navbar';
import { useSelector } from 'react-redux';
import { fetchUserData } from '../Redux/actions1';
import { PrivacyandCookies } from './Privacy ';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

const Profile = () => {




  return (
    <div>
      <NavBar />


      <div className="profilecontainer d-flex flex-wrap mt-4">
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div className="card text-center" style={{ border: 'none' }}>
            <img className="card-img-top mx-auto" src="https://cdn-icons-png.flaticon.com/512/10149/10149661.png" alt="Card image cap" />
            <div className="card-body">
              <a href="/transactions" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Transaction History</a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div className="card text-center" style={{ border: 'none' }}>
            <img className="card-img-top mx-auto" src="https://cdn-icons-png.flaticon.com/128/8216/8216067.png" alt="Card image cap" />
            <div className="card-body">
              <a href="/transfer" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Money transfer</a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div className="card text-center" style={{ border: 'none' }}>
            <img className="card-img-top mx-auto" src="https://us.123rf.com/450wm/arhimicrostok/arhimicrostok1705/arhimicrostok170504966/78192006-vector-credit-cards-icon-flat-design-style.jpg?ver=6" alt="Card image cap" />
            <div className="card-body">
              <a href="/creditcard" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Credit card activities</a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div className="card text-center" style={{ border: 'none' }}>
            <img className="card-img-top mx-auto" src="https://i.pngimg.me/thumb/f/720/comvecteezy289158.jpg" alt="Card image cap" />
            <div className="card-body">
              <a href="/payloan" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Loan</a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <div className="card text-center" style={{ border: 'none' }}>
            <img className="card-img-top mx-auto" src="https://i.pinimg.com/564x/d6/9c/a6/d69ca61689da7c22d563df221eaa7a5b.jpg" alt="Card image cap" />
            <div className="card-body">
              <a href="/insurance" className="btn btn-primary" style={{ backgroundColor: '#441475', color: 'white' }}>Insurance</a>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default Profile;
