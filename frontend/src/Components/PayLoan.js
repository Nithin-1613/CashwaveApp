import React from 'react';
import "./payloan.css";
import { useDispatch } from 'react-redux';
import { setButtonClicked } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';

const PayLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClicked = (buttonName) => {
    dispatch(setButtonClicked(buttonName));
    console.log(buttonName);
    navigate("/lenders");
  };

  return (
    <div class="d-grid gap-2 col-3 mx-auto">
      {/* <h2>PayLoan Component</h2> */}
      <button class="pill-button" onClick={() => handleButtonClicked('AddLoan')}>Add Loan</button>
      <button class="pill-button" onClick={() => handleButtonClicked('PayEMI')}>Pay EMI</button>
    </div>
  );
};

export default PayLoan;
