import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import "../style.css";
import { useSelector } from "react-redux";
const Transfer = () => {

    let navigate=useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userid = user.id;
    const [formData, setFormData] = useState({
        receiverNo: '',
        ifscCode: '',
        receiverName: '',
        description: '',
    });

    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        // Fetch recent transactions from your API or use dummy data
        axios.get("http://localhost:9090/transfer/" + userid + "/listTrans")
        .then((response) => {
            setRecentTransactions(response.data); // Assuming the response is an array of accounts
        })

        
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem("transaction_details",JSON.stringify(formData));
        navigate("/paymentpage");
    };

    return (
        <div className="Transfer">
            <div className="container mt-4">
                <div className="row justify-content-center ">
                    <div className="col-md-6 formrow">
                        <h2>Transfer Funds</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="receiverNo">Account Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="receiverNo"
                                    name="receiverNo"
                                    value={formData.receiverNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ifscCode">IFSC Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ifscCode"
                                    name="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="receiverName">Account Holder's Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="receiverName"
                                    name="receiverName"
                                    value={formData.receiverName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Confirm
                            </button>
                        </form>
                    </div>

                </div>
                <div className="row mt-4 recentTransactions">
                    <div className="col-md-12">
                        <h2>Recent Transactions</h2>
                        <div className="row mt-3">
                            {recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="col-md-4 mb-3">
                                    <button
                                        className="btn btn-block"
                                        onClick={() => {
                                            sessionStorage.setItem('transaction_details',JSON.stringify(transaction));
                                            navigate('/paymentpage');
                                        }}
                                    >
                                        <span className="badge rounded-pill" style={{ fontSize: "1.5rem" }}>
                                            {transaction.receiverName[0]}
                                        </span>
                                        <div className="transfername">{transaction.receiverName}</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={()=>{navigate("/transactions")}}>Back to transactions page</button>
            </div>
        </div>
    )

}

export default Transfer;