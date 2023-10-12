import React from "react";
import { Link } from "react-router-dom";
import Contact from "./contact-us";
import "./Navbar.css";
import Register from "./Registration";
import ForgotPassword from "./Forgotpassword";
import Footer from "./Footer";

const Home = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />

        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#420f5f" }}
        >
          <div class="navbar-logo">
            <a href="#">
              <img
                src="https://www.fintechfutures.com/files/2023/02/Natwest.png"
                width="50"
                height="50"
                alt="Brand Logo"
              />
            </a>
          </div>
          <div class="navbar-links">
            <a href="https://www.natwestgroup.com/who-we-are.html" style = {{marginLeft: "15px", marginBottom: "2px"}}>About</a>
            <a href="contact-us" style = {{marginLeft: "15px", marginBottom: "2px"}}>Help and Support</a>
          </div>
          <div class="navbar-space"></div>
          <div class="navbar-search">
            <input type="text" placeholder="Search" />
            <button class="search" style={{ backgroundColor: "#5a287d" }}>
              Search
            </button>
          </div>
        </nav>
      </div>
      <div className="personalcontainer">
        <div>
          <div
            class="content"
            style={{ backgroundColor: "#5a287d", height: "330px" }}
          >
            <div class="right-column">
              <div class="quote">
                <h2>Cashwave</h2>
                <p>"One stop solution to all your banking needs."</p>
              </div>
            </div>
            <div class="left column">
              <img
                src="https://www.globalbankingandfinance.com/wp-content/uploads/2021/04/Bank-of-2030.jpg"
                alt="Image Description"
                height="370px"
              />
            </div>
          </div>
          <div class="bottom-content" style={{ height: "300px", marginBottom: "0px" }}>
            <div class="buttons" style={{ marginTop: "120px" }}>
              <button
                className="login"
                style={{
                  backgroundColor: "#5a287d",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "70px",
                  paddingRight: "70px",
                  borderRadius:
                    "40px" /* Adjust the value to control the roundness of the pill shape */,
                }}
              >
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </button>
              <button
                className="register"
                style={{
                  backgroundColor: "#5a287d",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "65px",
                  paddingRight: "65px",
                  borderRadius:
                    "40px" /* Adjust the value to control the roundness of the pill shape */,
                }}
              >
                <Link to="/register" className="text-white">
                  Register
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
};

export default Home;
