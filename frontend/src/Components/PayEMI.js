import React, { useState } from 'react';
import "./PayEMI.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoanDetails } from '../Redux/actions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayEMI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loanNumber, setLoanNumber] = useState('');
  const selectedLender = useSelector((state) => state.lenders.selectedLender);


  const handleCheckLoan = async () => {

      try {
        const response = await axios.get("http://localhost:9091/loans/loans");
        console.log("Hi Response2!");
        console.log("http://localhost:9091/loans/loans");
        console.log(loanNumber);
        console.log(response.data);

        const matchingLoan = response.data.find(loan => loan.loanNumber === loanNumber && loan.lender === selectedLender);
        console.log(matchingLoan ? matchingLoan.loanNumber : 'No matching loan found');

        if (matchingLoan) {
          dispatch(setLoanDetails(matchingLoan.loanNumber, matchingLoan.lender, matchingLoan.amountPayable));
          navigate("/details");
        } else {
          alert('Details Not Found! :(');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking the loan.');
      }
  };

  return (
    <div id="formcontent" className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
      <h2>Pay EMI</h2>
      <p>Selected Lender: {selectedLender}</p>
      <div>
        <label>Loan Number:</label>
        <input
          type="text"
          value={loanNumber}
          onChange={(e) => setLoanNumber(e.target.value)}
        />
      </div>
      <button onClick={handleCheckLoan}>Check Loan</button>
    </div>
  );
};

export default PayEMI;