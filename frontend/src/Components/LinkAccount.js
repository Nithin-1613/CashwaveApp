import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { linkAccountSuccess, linkAccountFail } from '../Redux/actions';
import './LinkAccount.css';
import { useNavigate } from 'react-router-dom';

const LinkAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialPolicyState = {
    policyProviderName: '',
    policynumber: '',
    policytype: '',
    policyamount: '',
    premium: '',
    emailid: '',
    startdate: new Date(),
    enddate: new Date(),
   
  };

  const [policy, setPolicy] = useState(initialPolicyState);
  const [validationMessages, setValidationMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return pattern.test(email);
  };

  const validateEndDate = (endDate) => {
    const startDate = policy.startdate;
    const selectedEndDate = endDate;
    const minEndDate = new Date(startDate);
    minEndDate.setFullYear(startDate.getFullYear() + 1);
    return selectedEndDate >= minEndDate;
  };

  const validatePremium = (premium) => {
    const policyAmount = parseFloat(policy.policyamount);
    const premiumValue = parseFloat(premium);
    return premiumValue <= policyAmount;
  };

  const onInputChange = (e) => {
    let value = e.target.value;

    if (e.target.type === 'date') {
      value = new Date(value);
    }

    // Validate premium amount
    if (e.target.name === 'premium' && !validatePremium(value)) {
      setValidationMessages({ ...validationMessages, premium: 'Premium amount should be less than or equal to the policy amount.' });
    } else {
      setValidationMessages({ ...validationMessages, premium: '' });
    }

    // Validate end date
    if (e.target.name === 'enddate' && !validateEndDate(value)) {
      setValidationMessages({ ...validationMessages, enddate: 'End date must have a minimum 1-year gap from the start date.' });
    } else {
      setValidationMessages({ ...validationMessages, enddate: '' });
    }

    setPolicy({ ...policy, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const validationMessages = {};
  
    if (!validateEmail(policy.emailid)) {
      validationMessages.emailid = 'Enter a valid email address.';
    }
  
    if (!validateEndDate(policy.enddate)) {
      validationMessages.enddate = 'End date must have a minimum 1-year gap from the start date.';
    }
  
    if (!validatePremium(policy.premium)) {
      validationMessages.premium = 'Premium amount should be less than or equal to the policy amount.';
    }
  
    // Check if any validation errors exist
    if (Object.keys(validationMessages).length > 0) {
      setValidationMessages(validationMessages);
      return; // Prevent form submission
    }
  
    // Format startdate and enddate
    const formattedStartDate = policy.startdate.toISOString();
    const formattedEndDate = policy.enddate.toISOString();
  
    try {
      // Check if the policy already exists
      const response = await axios.get(
        `http://localhost:9092/api/policies?policynumber=${policy.policynumber}`
      );
  
      // Check if a policy with the same policy number exists
      if (response.data && response.data.length > 0) {
        const existingPolicy = response.data.find(
          (policyItem) => policyItem.policynumber === policy.policynumber
        );
        if (existingPolicy) {
          alert('Account Already Linked.');
          return;
        }
      }
  
      // If no existing policy was found and no validation errors, proceed to link the account
      const linkAccountResponse = await axios.post('http://localhost:9092/api/policies/link-account', {
        ...policy,
        startdate: formattedStartDate,
        enddate: formattedEndDate,
      });
  
      dispatch(linkAccountSuccess(linkAccountResponse.data));
      navigate('/');
      setSuccessMessage('Account Linking Successful');
      setPolicy(initialPolicyState);
    } catch (error) {
      console.error('Account Linking failed:', error);
      alert('Account Linking failed. Please try again.');
    }
  };

  return (
    <div className="container-reg">
      <div className="row formrow flex-grow">
        <div id="formcontent" className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center">Link Account</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="policyProviderName" className="form-label login-label">
                Policy Provider Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your policy provider"
                name="policyProviderName"
                value={policy.policyProviderName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="policynumber" className="form-label login-label">
                Policy Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your policy number"
                name="policynumber"
                value={policy.policynumber}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="policytype" className="form-label login-label">
                Policy Type
              </label>
              <select
                className="form-select"
                name="policytype"
                value={policy.policytype}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Select Policy Type</option>
                <option value="Health">Health</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Life">Life</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="policyamount" className="form-label login-label">
                Policy Amount
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the policy amount"
                name="policyamount"
                value={policy.policyamount}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="premium" className="form-label login-label">
                Premium Amount
              </label>
              <input
                type="text"
                className={`form-control ${validationMessages.premium ? 'is-invalid' : ''}`}
                placeholder="Enter the premium amount"
                name="premium"
                value={policy.premium}
                onChange={(e) => onInputChange(e)}
                required
              />
              {validationMessages.premium && (
                <div className="invalid-feedback">{validationMessages.premium}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="emailid" className="form-label login-label">
                Email ID
              </label>
              <input
                type="email"
                className={`form-control ${validationMessages.emailid ? 'is-invalid' : ''}`}
                placeholder="Enter your email ID"
                name="emailid"
                value={policy.emailid}
                onChange={(e) => onInputChange(e)}
                required
              />
              {validationMessages.emailid && (
                <div className="invalid-feedback">{validationMessages.emailid}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="startdate" className="form-label login-label">
                Policy Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="startdate"
                value={policy.startdate.toISOString().substr(0, 10)}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="enddate" className="form-label login-label">
                Policy End Date
              </label>
              <input
                type="date"
                className={`form-control ${validationMessages.enddate ? 'is-invalid' : ''}`}
                name="enddate"
                value={policy.enddate.toISOString().substr(0, 10)}
                onChange={(e) => onInputChange(e)}
                required
              />
              {validationMessages.enddate && (
                <div className="invalid-feedback">{validationMessages.enddate}</div>
              )}
            </div>

          

            <button type="submit" className="btn-submit">
              Link Account
            </button>
            <button type="button" onClick={() => navigate("/")} className="btn-submit mx-2">
              Cancel
            </button>
          </form>

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkAccount;
