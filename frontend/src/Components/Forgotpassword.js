import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initiatePasswordReset } from "../Redux/actions1";
import { Link } from "react-router-dom";
import { ResetPassword } from "./PasswordReset";
import CommonNavbar from "./CommonNavbar";
import Footer from "./Footer";
const ForgotPassword = () => {
  const [emailid, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(initiatePasswordReset(emailid));
    alert("check ur mail");
  };

  return (
    <div>
      <CommonNavbar />
      <div className="container login-container">
        <div className="row">
          <div
            className="col-md-6  loginformrow offset-md-3 mt-4"
            style={{
              color: "white",
              marginTop: "100px",
              marginBottom: "100px",
            }}
          >
            <h2 style = {{fontFamily: "knile,sans-serif"}}>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div
                className="mb-3 d-flex justify-content-between"
                style={{ marginRight: "none", paddingRight: "none" }}
              >
                <div className="col-8 col-md-6 text-center" style = {{marginLeft :"160px"}}>
                  <input
                    style={{ textAlign: "center" }}
                    placeholder="Enter your new password"
                    className="form-control"
                    type="email"
                    value={emailid}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" style = {{marginBottom: "20px"}}>Reset Password</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
