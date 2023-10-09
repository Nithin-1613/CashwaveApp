import React, { useEffect, useState } from 'react';
// import './UserDetails.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonNavbar from './CommonNavbar';
import Footer from './Footer';


const UserDetails = ({ match, history }) => {

  const id = useSelector((state) => state.admin.userid);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Fetch the user details based on the 'id' from the store
    axios.get("http://localhost:9093/api/users/" + id)
      .then((response) => {
        console.log('user fetched');
        console.log('id');
        console.log(id);
        console.log(response.data);
        console.log('index');
        console.log(response.data[0]);
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  const handleDeactivate = () => {
    console.log('user');
    console.log(user);
    console.log(user.block);
    console.log("id");
    console.log(user.id);

    // Send a request to deactivate the account by setting 'block' property to 1
    axios.put("http://localhost:9093/api/users/" + user.id, { ...user, block: 1 })
      .then(() => {

        // Optionally, you can update the user object in state to reflect the change
        setUser({ ...user, block: 1 });
        console.log(user.block);
      })
      .catch((error) => {
        console.error('Error deactivating the account:', error);
      });
  };

  const handleReactivate = () => {
    // Send a request to reactivate the account by setting 'block' property to 0
    axios.put("http://localhost:9093/api/users/" + user.id, { ...user, block: 0 })
      .then(() => {
        // Optionally, you can update the user object in state to reflect the change
        setUser({ ...user, block: 0 });
      })
      .catch((error) => {
        console.error('Error reactivating the account:', error);
      });
  };

  const handleDelete = () => {
    // Send a request to delete the account
    axios.delete("http://localhost:9093/api/users/" + user.id)
      .then(() => {
        // After successful deletion, navigate back to the user list
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting the account:', error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="UserDetails">
      <CommonNavbar />
      <div className='container mt-4 userdetailscontainer mb-4'>
        <div className='row justify-content-center'>
          <div id="formcontent-userdetails" className='col-md-6 formrow'>
            <h2>User Details</h2>
            <p><strong>User Name:</strong> {user.name}</p>
            <p><strong>Upi ID:</strong> {user.upi_ID}</p>
            <p><strong>Mobile Number:</strong> {user.mobilenumber}</p>
            <p><strong>Email Id:</strong> {user.emailid}</p>
            <p><strong>DOB:</strong> {user.dateofbirth}</p>
            <p><strong>AadharCard Number:</strong> {user.aadharcardnumber}</p>
            <p><strong>Security PIN:</strong> {user.security_PIN}</p>
            <p><strong>Salt:</strong> {user.salt}</p>
            <p><strong>Reset Token:</strong> {user.resetToken}</p>
            <p><strong>Reset Token Expiry Date:</strong> {user.resetTokenExpiryDate}</p>

            <button className="adminbutton" onClick={handleDeactivate} disabled={user.block === 1}>Block</button>
            <button className="adminbutton" onClick={handleReactivate} disabled={user.block === 0}>Unblock</button>
            <button className="adminbutton" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default UserDetails;
