// CommonNavbar.js

import React, { useState } from 'react';
import './Navbar.css';

const CommonNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#420f5f' }}>
      <div className="container">
      <div class="navbar-logo" style={{ marginLeft: "0px" }}>
        <a href="#">
          <img
            src="https://www.fintechfutures.com/files/2023/02/Natwest.png"
            width="50"
            height="50"
            alt="Brand Logo"
          />
        </a>
      </div>
        <h5 style = {{marginTop: "3px"}}>CashWave</h5>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style = {{backgroundColor: "white"}}
        >
          <span className="navbar-toggler-icon navbar-light"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CommonNavbar;
