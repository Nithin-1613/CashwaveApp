import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { policyLoginSuccess } from '../Redux/actions';
import './InsuranceMainPage.css';
import { useNavigate } from 'react-router-dom';

const InsuranceMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [policies, setPolicies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null); // Track selected policy
  const [policynumber, setPolicynumber] = useState("");
  const [insuranceProviders, setInsuranceProviders] = useState([]); // Track insurance providers

  const handleNavigate = () => {
    navigate('/linkAccount');
  };

  const handleaccChange = (e) => {
    setPolicynumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`http://localhost:9092/insurances?policynumber=${policynumber}`);
      if (result.data.length === 0) {
        alert('Policy Number not found');
      } else {
        dispatch(policyLoginSuccess(result.data));
        // Use the navigate function with the actual policynumber
        navigate(`/insuranceDetails/${policynumber}`);
        
      }
    } catch (error) {
      console.error('Policy Login failed:', error);
      alert('Policy Login failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:9092/insurances');
        setPolicies(response.data);
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };
    fetchPolicies();
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = (policyName) => {
    setSelectedPolicy(policyName);
    setShowModal(true);
  };

  const allProviders = policies.map((policy) => policy.policyProviderName);

  // Filter out duplicate insurance provider names and empty strings
  const filteredProviders = allProviders.filter(provider => provider);

  // Remove duplicate values
  const uniqueProviders = Array.from(new Set(filteredProviders));

  const handleLinkAccount = (providerName) => {
    navigate('/linkAccount');
  };
  return (
    <div className="main-container">
       <h2 className="all-providers-text">All Providers</h2>
     
      <div className="main-buttons">
        {uniqueProviders.map((provider) => (
          <button
            type="button"
            key={provider}
            onClick={() => handleShow(provider)}
          >
            {provider}
          </button>
        ))}
        <button type="button" onClick={handleNavigate}
        className="link-account-button">
          Link Account
        </button>
      </div>

      {/* Modal for Policy Login */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header"style={{ backgroundColor: 'rgb(64, 4, 80)' }}>
              <h5 className="modal-title">Policy Login - {selectedPolicy}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="policynumber" className="login-label">
                    Policy Number:
                  </label>
                  <input
                    type="text"
                    id="policynumber"
                    name="policynumber"
                    value={policynumber}
                    onChange={handleaccChange}
                    required
                    className="form-control login-input"
                    placeholder="Enter your policy number"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-submit2"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="submit" onClick={handleSubmit} className="btn-submit2" >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={handleClose}
          style={{ display: showModal ? 'block' : 'none' }}
        ></div>
      )}
    </div>
  );
};

export default InsuranceMainPage;
