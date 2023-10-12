import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../Redux/actions1";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import PersonalInfo from "./Personalinfo";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  //   const user = {"name":"Mohit"};

  return (
    // Conditional rendering or provide a default value

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
              <h4 style={{ marginTop: "20px", marginRight: "0px" }}>
                Welcome, {user.name}!
              </h4>
            ) : (
              <h1>Loading...</h1> // or provide an error message
            )}
          </div>
          <div class="col-auto">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#420f5f",
                  border: "none",
                  marginRight: "30px",
                  marginLeft: "0px",
                  paddingTop: "2px",
                }}
                variant="success"
                id="dropdown-basic"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
                  width="50"
                  height="50"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={{ pathname: "/Personalinfo", state: { user: user } }}
                >
                  Profile
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
  );
};
export default NavBar;
