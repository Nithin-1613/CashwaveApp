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
    <div className="d-grid gap-2 col-3 mx-auto">
      <button className="pill-button" onClick={() => handleButtonClicked('AddLoan')}>Add Loan</button>
      <button className="pill-button" onClick={() => handleButtonClicked('PayEMI')}>Pay EMI</button>
    </div>
  );
};

export default PayLoan;
