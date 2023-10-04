import React from 'react'
import { UseSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchPolicyData } from '../Redux/actions'

const Navbar = () => {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log('User Data:', user);
 

  useEffect(() => {
    // Fetch user data when the component is mounted (you can replace '123456' with the actual account number)
    dispatch(fetchPolicyData(policies.policynumber));
    
  }, [dispatch]); 
 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
<a className="navbar-brand" href="#">
      
      
        Natwest Banking
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
      
          <li className="nav-item">
            {policies ? (
            <h1>Welcome ,{policies.policynumber}!</h1>
        ) : (
            <h1>Loading...</h1> // or provide an error message
        )}
          </li>
        
      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"><img
            src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
            alt="Dropdown Icon"
            className="dropdown-icon"  width="50" height="50" 
          /></a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a className="dropdown-item"href="/">Personal info</a></li>
          <li><a className="dropdown-item"href="/">Feedback</a></li>
          <li><a className="dropdown-item" href="/">logout</a></li>
        </div> */}
        
      {/* </li> */}
      </ul>
      </div>
      
    </div>
  </nav>
  )
}

export default Navbar