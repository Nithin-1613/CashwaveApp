// EditProfileForm.js
import React, { useState } from 'react';
import axios from 'axios'; 
import { useDispatch,useSelector } from 'react-redux';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { updateUser } from '../Redux/actions1';

const EditProfileForm = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(user || {});
  
  const generateSalt = () => {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, (byte) => byte.toString(16)).join('');
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
 
  const salt=generateSalt();
  const hashedPIN=hashPassword(formData.security_PIN, salt);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the server
      console.log(user.id);
      const hashedPIN=hashPassword(formData.security_PIN, salt);
      const updatedFormData = { ...formData, security_PIN: hashedPIN,salt:salt };

      const updatedUser = await axios.put(
        `http://localhost:8081/users/update/${user.id}`,
        updatedFormData
      );

      // Dispatch a Redux action to update the user data in the store
      dispatch(updateUser(updatedUser.data));
     
          alert('changed successful!');
          navigate('/profile');
      // Redirect or show a confirmation message
    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <div>
    <label>
      Name:
      <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
    </label>
  </div>
  <div>
    <label>
      Mobile Number:
      <input type="text" name="mobilenumber" value={formData.mobilenumber || ''} onChange={handleInputChange} />
    </label>
  </div>
  <div>
    <label>
      Aadharcardnumber:
      <input type="text" name="aadharcardnumber" value={formData.aadharcardnumber || ''} onChange={handleInputChange} />
    </label>
  </div>
  <div>
    <label>
      Email:
      <input type="text" name="emailid" value={formData.emailid || ''} onChange={handleInputChange} />
    </label>
  </div>
  <div>
    <label>
      Security PIN:
      <input type="text" name="security_PIN" value={formData.security_PIN || ''} onChange={handleInputChange} />
    </label>
  </div>
  
  {/* Add input fields for other user information */}
  
  <div>
    <button type="submit">Save Changes</button>
    <Link to="/profile"  className='btn btn-danger mx-2'>Cancel</Link>
  </div>
</form>

  );
};

export default EditProfileForm;
