import React, { useEffect } from 'react';
import './AdminMainPage.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setid } from '../Redux/actions'; // Assuming 'reducer' is the path to your reducer
import CommonNavbar from './CommonNavbar';
import Footer from './Footer';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const id = useSelector((state) => state.id);

  // State to store the list of users
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered users based on the search query
  const filteredUsers = users.filter(user => user.upi_ID.includes(searchQuery));

  // Fetch the list of users from the JSON server
  useEffect(() => {
    axios.get('http://localhost:9093/api/users')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Handle user item click
  const handleUserItemClick = (clickedid) => {
    dispatch(setid(clickedid)); // Update the id in Redux store
    navigate(`/userDetails/${clickedid}`); // Navigate to user details page
  };

  return (
    <div className="AdminMain">
      <CommonNavbar/>
      <div className='container mt-4 addloancontainer'>
        <div className='row justify-content-center'>
          <div className='col-md-6 '>
            
            <input
              type="text"
              className='form-control'
              placeholder="Search by Upi_ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="list-group formrow">
              {filteredUsers.map((user) => (
                <li className="list-group-item" key={user.id} onClick={() => handleUserItemClick(user.id)} style={{ cursor: 'pointer' }}>
                  <strong></strong> {user.name}, <strong></strong> {user.upi_ID}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserList;
