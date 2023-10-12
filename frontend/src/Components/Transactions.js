import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonNavbar from "./CommonNavbar";
import Footer from "./Footer";

const Transactions = (props) => {
    const user = useSelector((state) => state.auth.user);
    const userid = user.id;
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('transactions'); // Default active tab is 'transactions'
    const [tableDetails, setTablEDetails] = useState([]);
    const [filteredTable, setFilteredTable] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState(null);

    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showBalance, setShowBalance] = useState(false);


    useEffect(() => {
        // Fetch data when the component mounts

        axios.get("http://localhost:8080/transfer/" + userid + "/listTrans")
            .then((response) => {
                const dataWithSNO = response.data.map((item, index) => ({
                    ...item,
                    sno: index + 1,
                }));
                setTablEDetails(dataWithSNO);
                setFilteredTable(dataWithSNO);
            });

        axios.get("http://localhost:8080/accounts/" + userid + "/listAccounts")
            .then((response) => {
                if (response.data.length === 0) {
                    // If there are no accounts, navigate to the '/addaccount' route
                    alert("You are a new user, register an account first");
                    navigate('/addaccount');
                } else {
                    setAccounts(response.data);
                }
            });
    }, []); // Add an empty dependency array to run the effect only once on mount

    useEffect(() => {
        // Filter the table when filterText changes
        const filteredData = tableDetails.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filterText.toLowerCase())
        );
        setFilteredTable(filteredData);
    }, [filterText, tableDetails]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleToSelectAccount = (account) => {
        setShowModal(true);
        setSelectedAccount(account);
    }

    const handlePinChange = (e) => {
        setPinError("");
        setPin(e.target.value);
    };

    const handleCheckBalance = () => {
        const formData = {
            emailid: user.emailid,
            security_PIN: pin
        }
        console.log(formData)
        // Make an HTTP request to your server (JSON Server in this case) with email and password
        axios.post('http://localhost:8081/users/login', formData).then((response) => {
            if (response.data) {
                setShowBalance(true);
                setPin("");
            }

        }).catch(() => {
            setPinError("\Invalid Pin");
        })


    }

    const handleCloseModal = () => {
        setShowBalance(false);
        setShowModal(false);
        setPin("");
        setPinError("");
    }

    const mapAccountNoToName = (fromAccountNo) => {
        const account = accounts.find((acc) => acc.accountNo === fromAccountNo);
        return account ? account.accountBankName : 'N/A';
      };
    return (
        <div className="transaction">
            <CommonNavbar />
            <div className="Transactions container mt-4">


                <Tabs defaultActiveKey="view-transactions" id="myTabs">
                    <Tab eventKey="view-transactions" title="View Transactions">
                        <div className="TransactionsList container mt-4">
                            <h2>View Transactions</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={filterText}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>SNO</th>
                                        <th>Receiver Name</th>
                                        <th>Receiver No</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>From Account</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTable.map((item) => (
                                        <tr key={item.sno}>
                                            <td>{item.sno}</td>
                                            <td>{item.receiverName}</td>
                                            <td>{item.receiverNo}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.description}</td>
                                            
                                            <td>{mapAccountNoToName(item.fromAccount)} - {item.fromAccount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab eventKey="check-balance" title="Check Account Balance">
                        <div className="TransactionsList container mt-4">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <h3>Accounts </h3>
                                    <div className="card-list">
                                        {accounts.map((account) => (
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter pin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 form-group">
                            <label htmlFor="pin" className="form-label">
                                PIN
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="pin"
                                name="pin"
                                value={pin}
                                onChange={handlePinChange}
                                required
                            />
                            {pinError && (
                                <div className="text-danger">{pinError}</div>
                            )}
                        </div>

                        {
                            showBalance && (
                                <h3 className="Balance-text">Balance: {selectedAccount.accountBalance} Rs. </h3>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleCheckBalance}>Check Balance</button>
                    </Modal.Footer>
                </Modal>
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/transfer')}>Make Transfer</button>
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/selftransfer')}>Self Transfer</button>
                <button className="btn btn-primary" onClick={() => { navigate("/profile") }}>Back to profile page</button>
            </div>

            <Footer />
        </div>
    );
}

export default Transactions;