import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
    let navigate=useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userid=user.emailid;
    const [newAccountData, setNewAccountData] = useState({
        accountNo: "",
        accountBankName: "",
        accountBalance: "",
    });

    const [errors, setErrors] = useState({});

    const handleNewAccountFormChange = (e) => {
        const { name, value } = e.target;
        setNewAccountData({
            ...newAccountData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (newAccountData.accountNo.length !== 12) {
            newErrors.accountNo = "Account number must have 12 digits";
        }
        // Add more validation rules as needed
        return newErrors;
    };

    const handleNewAccountFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            axios.post("http://localhost:8082/accounts/"+userid+"/addAccount", newAccountData)
            .then((response) => {
                alert("New Account added successfully");
                navigate('/transactions');
            })
            .catch((err) => {
                alert("Error while linking account");
            })
            setNewAccountData({
                accountNo: "",
                accountBankName: "",
                accountBalance: "",
            });
        } else {
            // Form has validation errors, update the state to show errors
            setErrors(newErrors);
        }
    };

    return (
        <div className="AddAccount">
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 formrow">
                        <h2>Link a New Account</h2>
                        <form onSubmit={handleNewAccountFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="accountNo">Account Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountNo"
                                    name="accountNo"
                                    value={newAccountData.accountNo}
                                    onChange={handleNewAccountFormChange}
                                    required
                                />
                                {errors.accountNo && (
                                    <div className="text-danger">{errors.accountNo}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountBankName">Account Bank Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountBankName"
                                    name="accountBankName"
                                    value={newAccountData.accountBankName}
                                    onChange={handleNewAccountFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountBalance">Account Balance</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="accountBalance"
                                    name="accountBalance"
                                    value={newAccountData.accountBalance}
                                    onChange={handleNewAccountFormChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Link Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;
