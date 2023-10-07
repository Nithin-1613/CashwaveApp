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
   
    dispatch(setEmiAmount(emiAmount));
    console.log(loanDetails);

    navigate("/banks");
  };

  return (
    <div id="formcontent" className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
      <h2>Loan Details</h2>
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

