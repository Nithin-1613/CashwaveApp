import React, { useState } from 'react';
import "./addloan.css"
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setLoanDetails } from '../redux/actions'; 
import axios from 'axios'; 

const AddLoan = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loanNumber, setLoanNumber] = useState('');
  const [amountPayable, setAmountPayable] = useState('');

  const selectedLender = useSelector((state) => state.lenders.selectedLender);

  const handleAddLoan = async () => {
    // Check if the loan number is an 8-digit sequence
    if (!/^\d{8}$/.test(loanNumber)) {
      alert('Loan number should be an 8-digit sequence.');
      return;
    }

    // Check if the amount payable is greater than 1000
    if (parseInt(amountPayable) <= 1000) {
      alert('Amount payable should be greater than 1000.');
      return;
    }

    // Fetch loan data from the server (assuming your API endpoint is /loans)
    try {
      // const response = await axios.get('http://localhost:8080/api/loans/loans'); // Adjust the endpoint
      // const existingLoan = response.data.find(
      //   (loan) =>
      //     loan.lender === selectedLender &&
      //     loan.loanNumber === loanNumber &&
      //     loan.amountPayable === amountPayable //*handle this. You should only check the lender and the loan number.
      // );

      // if (existingLoan) {
      //   alert('Record already exists.');
      //   return;
      // }

      // Dispatch an action to set the loan details
    //   dispatch(setLoanDetails(selectedLender, loanNumber, amountPayable));

      // Save the loan details to the server (assuming your API endpoint is /loans)
      await axios.post('http://localhost:8080/api/loans', {
        lender: selectedLender,
        loanNumber,
        amountPayable,
      }); // Adjust the endpoint

      // Redirect to the PayLoan component
      // You can implement the navigation logic here
      navigate("/payloan");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };

  return (
    <div className="addloan">
      <h2>AddLoan Component</h2>
      <p>Selected Lender: {selectedLender}</p>
      <div>
        <label>Loan Number:</label>
        <input
          type="text"
          value={loanNumber}
          onChange={(e) => setLoanNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Amount Payable:</label>
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