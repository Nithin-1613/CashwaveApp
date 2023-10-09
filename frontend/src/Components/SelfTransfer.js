import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonNavbar from "./CommonNavbar";
import Footer from "./Footer";


const SelfTransfer = () => {
    let navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userid = user.id;
    const email = user.emailid;
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toSelectAccount, setToSelectAccount] = useState(null);
    const [newAccountData, setNewAccountData] = useState({
        accountNo: "",
        accountBankName: "",
        accountBalance: 0,
    });
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8082/accounts/" + userid + "/listAccounts")
            .then((response) => {
                setAccounts(response.data);
                if (response.data.length > 0) {
                    setSelectedAccount(response.data[0]);
                    setToSelectAccount(response.data[1]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const [errors, setErrors] = useState({});
    const otherAccounts = accounts.filter((account) => account !== selectedAccount);

    const handleSelectAccount = (account) => {
        setSelectedAccount(account);
        setShowModal(false); // Close the modal after selecting a new account
    };

    const handleToSelectAccount = (account) => {
        setToSelectAccount(account);
    };

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
    const handlePayment = () => {

        const transaction_details = {
            receiverName: toSelectAccount.user.name,
            receiverNo: toSelectAccount.accountNo,
            description: "Self Transfer",
            fromAccountNo: selectedAccount.accountNo
        }
        sessionStorage.setItem("transaction_details", JSON.stringify(transaction_details));
        navigate("/paymentpage");
    }
    const handleNewAccountFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            axios.post("http://localhost:8082/accounts/" + email + "/addAccount", newAccountData)
                .then((response) => {
                    setAccounts([...accounts, response.data]);
                    setShowNewAccountModal(false);
                    alert("New Account added successfully");
                })
                .catch((err) => {
                    alert("Error while linking account");
                })

        } else {
            // Form has validation errors, update the state to show errors
            setErrors(newErrors);
        }// console.log(selectedAccount);
        // console.log(toSelectAccount)

    };
    return (
        <div className="SelfTransfer">
            <CommonNavbar/>
            <div className="container">

                <h1 >Self Transfer</h1>
                <div className="row justify-content-center mt-4 ">
                    <div className="col-md-4 m-4 formrow">
                        <h3>Selected Account</h3>
                        {selectedAccount && (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{selectedAccount.accountBankName}</h5>
                                    <p className="card-text">Account Number: {selectedAccount.accountNo}</p>
                                    {/* Add more account details as needed */}
                                </div>
                            </div>
                        )}
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            Change selected Account
                        </Button>
                    </div>
                    <div className="col-md-4 m-4 formrow">
                        <h3>Make payment to: </h3>
                        <div className="card-list">
                            {otherAccounts.map((account) => (
                                <div
                                    key={account.accountNo}
                                    className="card mb-3"
                                    onClick={() => handleToSelectAccount(account)}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{account.accountBankName}</h5>
                                        <p className="card-text">Account Number: {account.accountNo}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="card mb-3 " onClick={() => { setShowNewAccountModal(true); }}>
                                <div className="card-body ">
                                    <h5 className="card-title">Link another existing account details</h5>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" onClick={handlePayment}>
                            Make payments
                        </Button>
                    </div>
                </div>

                



                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title-custom">Select an Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className="card mb-3"
                                onClick={() => handleSelectAccount(account)}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{account.accountBankName}</h5>
                                    <p className="card-text">Account Number: {account.accountNo}</p>
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* New Account Modal */}
                <Modal show={showNewAccountModal} onHide={() => setShowNewAccountModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title-custom">Link a New Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowNewAccountModal(false)}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleNewAccountFormSubmit}>Link Account</button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer/>
        </div>
    );
};

export default SelfTransfer;
