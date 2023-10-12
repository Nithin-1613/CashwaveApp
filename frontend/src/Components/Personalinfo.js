import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import EditProfileForm from "./EditProfileform";
import Footer from "./Footer";

const PersonalInfo = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const containerStyle = {
    maxWidth: "600px", // Example style properties
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const paragraphStyle = {
    fontSize: "18px",
    margin: "10px 0",
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#420f5f" }}
      >
        <div class="navbar-logo" style={{ marginLeft: "112.2px" }}>
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
        <a href="/Profile">
          <h5 style = {{marginTop: "28px"}}>CashWave</h5>
        </a>
      </div>
        <div class="navbar-space"></div>
        <div class="navbar-user">
          <div class="row">
            <div class="col-auto">
              {user ? (
                <h3 style={{marginTop: "20px", marginRight: "0px"}}>Welcome, {user.name}!</h3>
              ) : (
                <h1>Loading...</h1> // or provide an error message
              )}
            </div>
            <div class="col-auto">
              <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "#420f5f", border: "none", marginRight: "30px", marginLeft: "0px", paddingTop: "2px"}} variant="success" id="dropdown-basic">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
                    width="50"
                    height="50"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={{ pathname: "/profile", state: { user: user } }}
                >
                  Dashboard
                </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">feedback</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      <div className = "container personalcontainer">
      <div
        className="col-md-6  loginformrow offset-md-3 mt-4"
        style={{ ...containerStyle, marginTop: "20px", marginBottom: "20px" }}
      >
        <div class = "fontcolor" style = {{color: "#420f5f", justify: "left", fontFamily: "knile,sans-serif"}}>
        <h1 style = {{fontFamily: "knile,sans-serif"}}>Personal Information</h1>
        <p style={paragraphStyle}>
          <strong>Name: </strong>
          {user.name}
        </p>
        <p style={paragraphStyle}>
          <strong>Email: </strong>
          {user.emailid}
        </p>
        <p style={paragraphStyle}>
          <strong>Aadharcardnumber: </strong>
          {user.aadharcardnumber}
        </p>
        <p style={paragraphStyle}>
          <strong>Mobile Number: </strong>
          {user.mobilenumber}
        </p>
        <p style={paragraphStyle}>
          <strong>Date of birth: </strong>
          {user.dateofbirth}
        </p>
        <p style={paragraphStyle}>
          <strong>UPI ID: </strong>
          {user.upi_ID}
        </p>
        </div>
        <Link to="/EditProfileform">
          <button>Edit</button>
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  );
};
export default PersonalInfo;
