import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import CommonNavbar from './CommonNavbar';

const InsuranceDetails = () => {
  const { policynumber } = useParams();
  const policies = useSelector(state => state.reducer.policies);
  const navigate = useNavigate();

  console.log(policies);
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

  const handlePayment = () => {
    const transaction_details = {
      receiverNo: policy.policynumber,
      receiverName: policy.policyProviderName,
      description: "Insurance amount",
      amount: policy.premium
    }
    sessionStorage.setItem("transaction_details", JSON.stringify(transaction_details));
    navigate("/paymentpage");
  }
  return (
    <div>
      <CommonNavbar/>
      
        

        <div className="container  mt-5 mb-5">
          <div className='row justify-content-center'>
          <div className='col-md-6 formrow'>
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
                onClick={handlePayment}
                className="btn btn-primary"
                
              >
                Pay Premium Amount:{policy.premium} INR
              </button>
            </div>
          </div>
          </div>
          </div>
          


        </div>

      <Footer/>
    </div>
  );
};

export default InsuranceDetails;
