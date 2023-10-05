import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const InsuranceDetails = () => {
  const { policynumber } = useParams();
  const policies = useSelector(state => state.policies);
  const navigate = useNavigate();

  const policiesArray = policies[0]; // Access the innermost array
  const policy = policiesArray.find(policy => policy.policynumber === policynumber);

  if (!policy) {
    // Handle the case where the policy is not found
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">
          <strong>Policy not found</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid service-bg vh-100" style={{ backgroundColor: 'rgb(64, 4, 80)' }}>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Natwest Banking
          </a>
          <div className="d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="navbar-brand">
                  Welcome &nbsp;&nbsp;&nbsp;{policy.policynumber}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container service-content mt-5" style={{ backgroundColor: 'rgb(87, 5, 110)' }}>
        <div className="card text-center">
          <div className="card-header">
            <h2 className="policy-heading">Policy Details</h2>
          </div>
          <div className="card-body">
            <p className="policy-text"><strong>Policy Number:</strong> {policy.policynumber}</p>
            <p className="policy-text"><strong>Policy Provider:</strong> {policy.policyProviderName}</p>
            <p className="policy-text"><strong>Policy Type:</strong> {policy.policytype}</p>
            <p className="policy-text"><strong>Policy Amount:</strong> {policy.policyamount}</p>
            <p className="policy-text"><strong>Premium Amount:</strong> {policy.premium}</p>
            {/* Add more policy details here */}
            <button
          onClick={() => navigate('/paymentpage')}
          className="btn btn-primary mt-4"
          style={{ backgroundColor: 'rgb(87, 5, 110)' }}
        >
          <p className="policy-text"><strong>Pay Premium Amount:</strong> {policy.premium} INR</p>
        </button>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default InsuranceDetails;
