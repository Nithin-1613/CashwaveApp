// EditProfileForm.js
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SHA256 } from "crypto-js";
import { updateUser } from "../Redux/actions1";
import NavBar from "./Navbar";
import Footer from "./Footer";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(user || {});

  const generateSalt = () => {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16)).join("");
  };

  // Function to hash the password with a salt
  const hashPassword = (password, salt) => {
    const hashedPassword = SHA256(password + salt).toString();
    return hashedPassword;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const salt = generateSalt();
  const hashedPIN = hashPassword(formData.security_PIN, salt);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the server
      console.log(user.id);
      const hashedPIN = hashPassword(formData.security_PIN, salt);
      const updatedFormData = {
        ...formData,
        security_PIN: hashedPIN,
        salt: salt,
      };

      const updatedUser = await axios.put(
        `http://localhost:8081/users/update/${user.id}`,
        updatedFormData
      );

      // Dispatch a Redux action to update the user data in the store
      dispatch(updateUser(updatedUser.data));

      alert("changed successful!");
      navigate("/");
      // Redirect or show a confirmation message
    } catch (error) {}
  };

  return (
    <div>
      <NavBar />
      <div className="container login-container" >
        <div className="row">
          <div className="col-md-6  loginformrow offset-md-3 mt-4" style = {{padding: "40px", paddingBottom: "20px"}}>
            <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex justify-content-between" style = {{marginRight: "none", paddingRight: "none"}}>
                <label className="mr-2">Name: </label>
                <div className="col-8 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                  />
                  </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <label className="mr-2">Mobile Number: </label>
                <div className="col-8 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name="mobilenumber"
                    value={formData.mobilenumber || ""}
                    onChange={handleInputChange}
                  />
                  </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <label className="mr-2">Aadharcardnumber: </label>
                <div className="col-8 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name="aadharcardnumber"
                    value={formData.aadharcardnumber || ""}
                    onChange={handleInputChange}
                  />
                  </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <label className="mr-2">Email: </label>
                <div className="col-8 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name="emailid"
                    value={formData.emailid || ""}
                    onChange={handleInputChange}
                  />
                  </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <label className="mr-2">Security PIN: </label>
                <div className="col-8 col-md-6"> {/* Adjust the column widths as needed */}
    <input
      className="form-control"
      type="password"
      name="security_PIN"
      value={formData.security_PIN || ""}
      onChange={handleInputChange}
    />
  </div>
              </div>

              {/* Add input fields for other user information */}

              <div>
                <button type="submit">Save Changes</button>
                <Link to="/profile" className="btn btn-primary" style = {{fontWeight: "light"}}>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfileForm;
