import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmiAmount } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emiAmount, setEmiAmountValue] = useState('');
  const loanDetails = useSelector((state) => state.loanDetails);

  const handleContinuePayment = () => {
    // Validation logic can be added here
    const transaction_details={
      receiverNo:loanDetails.loanNumber,
      receiverName:loanDetails.lender,
      description:"Loan Emi"
    }
    sessionStorage.setItem("transaction_details",transaction_details);
    // Dispatch an action to set the EMI amount
    dispatch(setEmiAmount(emiAmount));
    console.log(loanDetails);

    // Redirect to the Banks component
    navigate("/paymentpage"); // Adjust the path as per your routing
  };

  return (
    <div>
      <h2>Details Component</h2>
      {/* Fetch details from the database */}
      <p>Selected Lender: {loanDetails.lender}</p>
      <p>Loan Number: {loanDetails.loanNumber}</p>
      <p>Amount Payable: {loanDetails.amountPayable}</p>
      <div>
        <label>Enter EMI Amount:</label>
        <input
          type="text"
          value={emiAmount}
          onChange={(e) => setEmiAmountValue(e.target.value)}
        />
      </div>
      <button onClick={handleContinuePayment}>Continue with Payment</button>
    </div>
  );
};

export default Details;
