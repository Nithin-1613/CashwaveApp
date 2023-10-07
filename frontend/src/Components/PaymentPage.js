import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PaymentPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userid = user.id;
  const email = user.emailid;
  const details = JSON.parse(sessionStorage.getItem('transaction_details'));
  const hasFromAccountNo = details && details.fromAccountNo;
  const hasAmount=details && details.amount;
  if (!details) {
    navigate('/');
  }
  const [amount, setAmount] = useState(hasAmount ? details.amount : 0);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(hasFromAccountNo ? details.fromAccountNo : "");




  // Fetch accounts when the component mounts
  useEffect(() => {


    axios.get("http://localhost:8082/account/" + userid + "/listAccounts")
      .then((response) => {
        setAccounts(response.data); // Assuming the response is an array of accounts
      })
      .catch((error) => {
        console.error("Error fetching accounts: ", error);
      });
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePinChange = (e) => {
    setPinError("");
    setPin(e.target.value);
  };

  const handleAccountChange = (e) => {
    console.log(e.target.value);
    setSelectedAccount(e.target.value);

  };




  const handlePayment = (e) => {
    e.preventDefault();
    // Validate PIN (You can replace this with your validation logic)
    const formData = {
      emailid: user.emailid,
      security_PIN: pin
    }
    console.log(formData)
    // Make an HTTP request to your server (JSON Server in this case) with email and password
    axios.post('http://localhost:8081/userservice/login', formData).then((responsePin) => {
      if (responsePin.data) {
        const transaction_details = {
          receiverNo: details.receiverNo,
          receiverName: details.receiverName,
          amount: amount,
          description: details.description,

        }

        const transferreq = {
          transactionRequest: transaction_details,
          fromAccountNo: selectedAccount
        }

        console.log(transferreq);

        axios.put("http://localhost:9090/transfer/" + email + "/makeTransfer", transferreq)
          .then((response) => {
            if (response.status === 200) {
              // Successful transfer
              console.log(response.data); // Transaction details
              alert("Transaction Successful");
            } else if (response.status === 400) {
              // Bad request (e.g., insufficient balance)
              console.error("Bad Request:", response.data);
              alert("Transaction failed: " + response.data);
            } else if (response.status === 404) {
              // Not found (e.g., accounts not found)
              console.error("Not Found:", response.data);
              alert("Transaction failed: " + response.data);
            } else {
              // Other server errors
              console.error("Server Error:", response.data);
              alert("Transaction failed due to a server error.");
            }
          })
          .catch((error) => {
            // Network errors or unexpected exceptions
            console.error("Error:", error);
            alert("An error occurred while processing the transaction.");
          });

        setAmount(0);
        setPin("");
        setPinError(null);
        sessionStorage.clear();
        navigate("/transfer");

      }
    }).catch((error)=>{
        console.log(error);
        setPinError("Invalid Pin");
    })


  };
  return (
    <div className="PaymentPage">
      <div className="container mt-4">
        <div className="row justify-content-center ">
          <div className="col-md-6 formrow">
            <h1>Payment gateway </h1>
            <h2>To : {details.receiverName}</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-3 form-group">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </div>
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

              <div className="mb-3 form-group">
                <label htmlFor="account" className="form-label">
                  Select Account
                </label>
                <select
                  className="form-select"
                  id="account"
                  name="account"
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  disabled={hasFromAccountNo}
                >
                  {accounts.map((account) => (
                    <optgroup key={account.accountNo} label={account.accountBankName}>
                      <option value={account.accountNo}>
                        {account.accountBankName}: {account.accountNo}
                      </option>
                    </optgroup>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Pay
              </button>
              <button type="cancel" onClick={() => {
                navigate("/transfer");
                sessionStorage.clear();
              }} className="btn btn-primary">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PaymentPage;