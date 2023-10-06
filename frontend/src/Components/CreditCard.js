import { useEffect, useState } from "react";
import axios from "axios";
import { Modal,Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreditCard = () => {
    const user = useSelector((state) => state.auth.user);
    const userid=user.id;
    const email=user.emailid;
    const [creditCards, setCreditCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectCreditCard, setSelectCreditCard] = useState("");
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    // State variable to track form validity
    const [isFormValid, setIsFormValid] = useState(false);

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    let navigate=useNavigate();

    const [newCreditCard, setNewCreditCard] = useState({
        creditCardNo: "",
        bankName: "",
        cardHolderName: "",
        expiryDate: null, // Use null to represent an empty date
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCreditCard({ ...newCreditCard, [name]: value });
    };

    useEffect(() => {

        axios.get("http://localhost:8085/creditcard/"+userid+"/listCreditCard")
            .then((response) => {
                setCreditCards(response.data);
                setLoading(false); // Set loading to false once data is loaded
            })
            .catch((error) => {
                console.error("Error fetching credit cards: ", error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    useEffect(() => {
        const isValid = Object.values(newCreditCard).every((value) => value !== null && value !== "");
        setIsFormValid(isValid);
    }, [newCreditCard]);

    const handleExpiryDateChange = (date) => {
        console.log(date);
        

        
        setNewCreditCard({ ...newCreditCard, expiryDate: date });
    };

    const handleSelectCreditCard = (index) => {
        setSelectedCardIndex(index);
        setSelectCreditCard(creditCards[index]);
        console.log(creditCards[index]);
    }

    const handlePayment= ()=>{
        const transaction_details={
            receiverNo:selectCreditCard.creditCardNo,
            receiverName:selectCreditCard.cardHolderName,
            description:"Creditcard bill"
        }
        sessionStorage.setItem('transaction_details',JSON.stringify(transaction_details));
        navigate("/paymentpage");

    }
    const handleSaveCreditCard = () => {
        // Send a request to save the new credit card here
        
        console.log("Saving new credit card:", newCreditCard);
        const expiryDate=newCreditCard.expiryDate;
        // Extract the month and year from the Date object
        const month = (expiryDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to the month since it's 0-based
        const year = expiryDate.getFullYear().toString();

        // Format the date as "MM/YYYY"
        const formattedExpiryDate = `${month}/${year}`;
        const ccRequest={
            creditCardNo: newCreditCard.creditCardNo,
            bankName: newCreditCard.bankName,
            cardHolderName: newCreditCard.cardHolderName,
            expiryDate: formattedExpiryDate
        }

        console.log(formattedExpiryDate);
        axios.post("http://localhost:8085/creditcard/"+email+"/addCreditCard",ccRequest).then(()=>{
            alert("credit card added successfully")
            window.location.reload();
        })
        .catch(()=>{
            alert("Error while linking");
        })
        // Close the modal
        setShowNewAccountModal(false);
    };

    return (
        <div className="creditcard container mt-4">
            <h1>Credit Cards</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3>Select a Credit Card</h3>
                        <div className="card-list">
                            {creditCards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`card mb-3 ${selectedCardIndex === index ? 'selected-card' : ''}`}
                                    onClick={() => handleSelectCreditCard(index)}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{card.bankName}</h5>
                                        <p className="card-text">Credit Card Number: {card.creditCardNo}</p>
                                        <p className="card-text">Card Holder: {card.cardHolderName}</p>
                                        <p className="card-text">Expiry Date: {card.expiryDate}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="card mb-3 " onClick={() => { setShowNewAccountModal(true); }}>
                                <div className="card-body ">
                                    <h5 className="card-title">Link another existing credit card details</h5>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" onClick={handlePayment}>
                            Make Payment
                        </Button>
                    </div>
                </div>
            )}
            <Modal show={showNewAccountModal}>
                <Modal.Header>
                    <Modal.Title>Add a new Credit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="creditCardNo">Credit Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="creditCardNo"
                                name="creditCardNo"
                                value={newCreditCard.creditCardNo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bankName">Bank Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bankName"
                                name="bankName"
                                value={newCreditCard.bankName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolderName">Card Holder Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardHolderName"
                                name="cardHolderName"
                                value={newCreditCard.cardHolderName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <DatePicker
                                selected={newCreditCard.expiryDate}
                                onChange={handleExpiryDateChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className="form-control"
                                id="expiryDate"
                                name="expiryDate"
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowNewAccountModal(false)}>Close</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSaveCreditCard} disabled={!isFormValid}>Link Account</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default CreditCard;