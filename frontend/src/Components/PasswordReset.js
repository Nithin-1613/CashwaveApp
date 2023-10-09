import React, { useState } from 'react';
import axios from 'axios'; 
import { useDispatch,useSelector } from 'react-redux';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState(user || {});
    console.log(user);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Send the updated data to the server
        console.log(user.id);
        const updatedpassUser = await axios.put(`http://localhost:8081/users/update_password/${user.id}`,formData);
  
        // Dispatch a Redux action to update the user data in the store
        dispatch({ type: 'UPDATE_USER', payload: updatedpassUser.data });
       
            alert('changed successful!');
            navigate('/profile');
        // Redirect or show a confirmation message
      } catch (error) {
        console.log("something wrong");
        // Handle and display errors
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
        PIN:
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

export default ResetPassword;
