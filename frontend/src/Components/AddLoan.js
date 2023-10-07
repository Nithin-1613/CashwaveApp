import React, { useState } from 'react';
import "./addloan.css"
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setLoanDetails } from '../redux/actions'; 
import axios from 'axios'; 

const AddLoan = () => {
  const navigate = useNavigate();
  const description = 'PayLoan';
  const [loanNumber, setLoanNumber] = useState('');
  const [amountPayable, setAmountPayable] = useState('');

  const selectedLender = useSelector((state) => state.lenders.selectedLender);

  const handleAddLoan = async () => {

    if (!/^\d{8}$/.test(loanNumber)) {
      alert('Loan number should be an 8-digit sequence.');
      return;
    }

    if (parseInt(amountPayable) <= 1000) {
      alert('Amount payable should be greater than 1000.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:9091/api/loans/loans');
      const existingLoan = response.data.find(
        (loan) =>
          loan.lender === selectedLender &&
          loan.loanNumber === loanNumber
      );
        console.log(response.data)
      if (existingLoan) {
        alert('Record already exists.');
        return;
      }

      await axios.post('http://localhost:9091/api/loans', {
        lender: selectedLender,
        loanNumber,
        amountPayable
      }); 

      navigate("/payloan");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };

  return (
    <div id="formcontent" className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
      <h2>Add Loan Details</h2>
      <p>Selected Lender: {selectedLender}</p>
      <div>
        <label>Loan Number</label>
        <input
          type="text"
          value={loanNumber}
          onChange={(e) => setLoanNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Amount Payable</label>
        <input
          type="text"
          value={amountPayable}
          onChange={(e) => setAmountPayable(e.target.value)}
        />
      </div>
      <button onClick={handleAddLoan}>Add Loan</button>
    </div>
  );
};

export default AddLoan;