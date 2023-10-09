import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/actions1';
import { Link } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const generateUPIID = (userIdentifier, vpaDomain) => {
        const uniqueID = Math.random().toString(36).substring(2, 15); // Generate a random alphanumeric string
        return `${userIdentifier}@${vpaDomain}`;
    };
    const [user, setUsers] = useState({
        mobilenumber: "",
        emailid: "",
        name: "",
        dateofbirth: "",
        aadharcardnumber: "",
        security_PIN: "",
        upi_ID:"",
        block:"",
    });

    const { mobilenumber, emailid, name, dateofbirth,aadharcardnumber,security_PIN, upi_ID,block } = user;


    //validation
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isAadharValid, setIsAadharValid] = useState(true);
    const [isMobileValid, setIsMobileValid] = useState(true);
    const [isPINValid, setIsPasswordValid] = useState(true);
    const [isEmailUnique, setIsEmailUnique] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const validateEmail = (emailid) => {
        const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = pattern.test(emailid);
        setIsEmailValid(isValidEmail);
    };
    const validateAadhar = (aadhar) => {
        const aadharRegex = /^[2-9]{1}[0-9]{11}$/; // Example: 123456789012
        setIsAadharValid(aadharRegex.test(aadhar));
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
        setIsMobileValid(mobileRegex.test(mobile));
    };

    const validatePIN = (security_PIN) => {
        const passwordRegex = /^\d{4}$/;
        setIsPasswordValid(passwordRegex.test(security_PIN));
    };


    const onInputChange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value });
        if (e.target.name === 'emailid') {
            validateEmail(e.target.value);
        } else if (e.target.name === 'aadharcardnumber') {
            validateAadhar(e.target.value);
        } else if (e.target.name === 'mobilenumber') {
            validateMobile(e.target.value);
        } else if (e.target.name === 'security_PIN') {
            validatePIN(e.target.value);
        }

    };

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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isEmailValid && isAadharValid && isMobileValid && isPINValid) {
            const dob = new Date(user.dateofbirth);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dob.getFullYear();
        
            // Check if the user is at least 16 years old
            if (age < 16) {
              alert('You must be at least 16 years old to register.');
              return; // Don't proceed with registration
            }
          const salt = generateSalt();
          const hashedPassword = hashPassword(user.security_PIN, salt);
    
        const UPIID = generateUPIID( user.aadharcardnumber,'natwest'); // Replace 'yourbankname' with your actual VPA domain
        const updatedUser = { ...user, salt:salt,
            security_PIN:hashedPassword,
            upi_ID: UPIID,
            block:0 };
    // Update the user object with the generated UPI ID
   
        try {
            const resp = await axios.get(
                `http://localhost:8081/userservice/checkEmail?emailid=${updatedUser.emailid}`
              );
              if (!resp.data) {
                const existingemail = resp.data.find(
                  (Emailcred) => Emailcred.emailid === updatedUser.emailid
                );
                if (existingemail) {
                  alert('Account Already Linked with this email.');
                  return;
                }
              }
            const response = await axios.post('http://localhost:8081/userservice/register',updatedUser);
          dispatch(register(response.data));
          alert('Registration successful!');
          navigate('/');
          
        } catch (error) {
            
            console.error('Registration failed:', error);
            alert('Account Linking failed. Please try again.');
          }
         
        }
        else {
            alert('Please enter valid details');
        }

    }

    return (
        // register form
        <div>
            <nav class="navbar">
                <div class="navbar-logo">
                    <a href="#">
                        <img src="https://www.fintechfutures.com/files/2023/02/Natwest.png" width="50" height="50" alt="Brand Logo" />
                    </a>
                </div>
                <div class="navbar-links">
                    <a href="/">Home</a>

                </div>


            </nav>
            <div className="container">
                <div className='row'>
                    <div id="formcontent" className='col-md-5 offset-md-3 border rounded  shadow'>
                        <div className="text-center">
                            <h2 className=" mb-4"> RegisterUsers</h2>
                        </div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='mb-3'>
                                <label htmlFor='mobilenumber' className='form-label login-label'>Mobile number</label>
                                <input type={"text"}
                                    className='form-control'
                                    placeholder='enter your Mobile number'
                                    name="mobilenumber"
                                    value={mobilenumber}
                                    onChange={(e) => onInputChange(e)} />
                                {!isMobileValid && <span className='text-danger'>Invalid Mobile Number</span>}

                            </div>

                            <div className='mb-3'>
                                <label htmlFor='emailid' className='form-label login-label'>Email id</label>
                                <input type={"email"}
                                    className='form-control'
                                    placeholder='enter your email'
                                    name="emailid"
                                    value={emailid}
                                    onChange={(e) => onInputChange(e)} />
                                {!isEmailValid && <span className='text-danger'>Invalid Email</span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label login-label'>Name</label>
                                <input type={"text"}
                                    className='form-control'
                                    placeholder='enter your Name'
                                    name="name"
                                    value={name}
                                    onChange={(e) => onInputChange(e)} />

                            </div>


                            <div className='mb-3'>
                                <label htmlFor='aadharcardnumber' className='form-label login-label'>Aadharcardnumber</label>
                                <input type={"text"}
                                    className='form-control'
                                    placeholder='enter your Aadharcardnumber'
                                    name="aadharcardnumber"
                                    value={aadharcardnumber}
                                    onChange={(e) => onInputChange(e)} />
                                {!isAadharValid && <span className='text-danger'>Invalid Aadharcardnumber</span>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='dateofbirth' className='form-label login-label'>Dateofbirth</label>
                                <input type={"date"}
                                    className='form-control'
                                    placeholder='enter your Dateofbirth'
                                    name="dateofbirth"
                                    value={dateofbirth}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='security_PIN' className='form-label login-label'>Security PIN</label>
                                <input type={"password"}
                                    className='form-control'
                                    placeholder='enter your Security PIN'
                                    name="security_PIN"
                                    value={security_PIN}
                                    onChange={(e) => onInputChange(e)} />
                                {!isPINValid && <span className='text-danger'>Invalid Security PIN</span>}
                            </div>

                            <button type="submit" className='btn btn-outline-primary'>Submit</button>
                            <Link to="/" className='btn btn-danger mx-2'>Cancel</Link>
                        </form>

                    </div>
                </div>



            </div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
            

        </div>
    )
}

export default Register;
