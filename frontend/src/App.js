import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InsuranceMainPage from './Components/InsuranceMainPage';
import LinkAccount from './Components/LinkAccount';
import InsuranceDetails from './Components/InsuranceDetails';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './Redux/store';
import PaymentPage from './Components/PaymentPage';
import SelfTransfer from './Components/SelfTransfer';
import Transfer from './Components/Transfer';
import CreditCard from './Components/CreditCard';
import PayLoan from './Components/PayLoan'; 
import Lenders from './Components/Lenders';
import AddLoan from './Components/AddLoan';
import PayEMI from './Components/PayEMI';
import Details from './Components/Details';
import Banks from './Components/Banks';
import Status from './Components/Status';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InsuranceMainPage />} />
            <Route path="/linkAccount" element={<LinkAccount />} />
            <Route path="/paymentpage" element={<PaymentPage/>} />
            <Route path='/selftransfer' Component={SelfTransfer}/>
            <Route path='/transfer' Component={Transfer}/>
            <Route path='/creditCard' Component={CreditCard}/>
            <Route path="/insuranceDetails/:policynumber" element={<InsuranceDetails />} />
            <Route path="/payloan" Component={PayLoan}/>
            <Route path="/lenders" Component={Lenders}/>
            <Route path="/addloan" Component={AddLoan}/>
            <Route path="/payemi" Component={PayEMI}/>
            <Route path="/details" Component={Details}/>
            <Route path="/banks" Component={Banks}/>
            <Route path="/status" Component={Status}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
