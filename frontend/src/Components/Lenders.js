import React from 'react';
import "./lenders.css";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setSelectedLender } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';

const Lenders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonClicked = useSelector((state) => state.payLoan.buttonClicked);

  const handleLenderSelect = (selectedLender) => {
    dispatch(setSelectedLender(selectedLender));
    console.log(selectedLender);

    if (buttonClicked === 'AddLoan') {
      navigate("/addLoan");
    }
    else if (buttonClicked === 'PayEMI') {
      navigate("/payEMI");
    }
  };

  const lenders = ['State Bank of India (SBI)', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank (PNB)', 'Kotak Mahindra Bank', 'Yes Bank', 'IDBI Bank', 'Canara Bank', 'Federal Bank'];

  return (
    <div className='lenders'>
      <div className='container mt-4'>
        <div className='row justify-content-center'>
        <div className='col-md-6'>
        <h2>Lenders</h2>
        <div class="list-group">
          <ul>
            {lenders.map((lender) => (
              <li key={lender}>
                <button class="list-group-item list-group-item-action" onClick={() => handleLenderSelect(lender)}>{lender}</button>
              </li>
            ))}
          </ul>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Lenders;
