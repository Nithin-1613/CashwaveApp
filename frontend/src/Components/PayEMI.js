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
      const config = {
        params: { lender: selectedLender }
      };
      // console.log(req);
      console.log(`http://localhost:8080/api/loans/loans/${loanNumber}`);
      const response = await axios.get(`http://localhost:8080/api/loans/loans/${loanNumber}`, config);

      console.log(response);
      // console.log(req);

      if (response.data.length > 0) {
        // If data is found, navigate to 'details'
        dispatch(setLoanDetails(response.data[0].lender, response.data[0].loanNumber, response.data[0].amountPayable))
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
    <div className='payemi'>
      <h2>PayEMI</h2>
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
