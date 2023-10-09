import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initiatePasswordReset } from '../Redux/actions1';
import { Link } from 'react-router-dom';
import {ResetPassword} from './PasswordReset';
const ForgotPassword = () => {
  const [emailid, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(initiatePasswordReset(emailid));
    alert("check ur mail")
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={emailid}
            onChange={handleEmailChange}
            required
          />
        </label>
        

        
        <button type="submit">Reset Password</button>

        <Link to="/"  className='btn btn-danger mx-2'>Cancel</Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
