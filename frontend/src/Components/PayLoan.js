import React from 'react';
import "./payloan.css";
import { useDispatch } from 'react-redux';
import { setButtonClicked } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from './CommonNavbar';
import Footer from './Footer';

const PayLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClicked = (buttonName) => {
    dispatch(setButtonClicked(buttonName));
    console.log(buttonName);
    navigate("/lenders");
  };

  return (
    <div>
      <CommonNavbar />
      <div className='loancontainer'>
        <div className="row justify-content-center">
          <div className='col-md-12'>
            <button className="pill-button" onClick={() => handleButtonClicked('AddLoan')}>Add Loan</button>
            <button className="pill-button" onClick={() => handleButtonClicked('PayEMI')}>Pay EMI</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PayLoan;
