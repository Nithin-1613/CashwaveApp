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
import Transactions from './Components/Transactions';
import Login from './Components/Login';
import Register from './Components/Registration';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Contact from './Components/contact-us';
import PrivacyAndCookies from './Components/Privacy ';
import AddAccount from './Components/AddAccount';
import AdminMainPage from './Components/AdminMainPage';
import UserDetails from './Components/UserDetails';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/contact-us" element={<Contact/>} /> 
            <Route exact path="/Privacy" element={<PrivacyAndCookies/>} />
           
            {/* Add more routes for other pages */}
            <Route render={() => <div>Page not found</div>} />
            <Route path="/insurance" element={<InsuranceMainPage />} />
            <Route path="/addaccount" Component={AddAccount}/>
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
            <Route path="/transactions" Component={Transactions}/>
            <Route path="/admin" element={<AdminMainPage/>} />
            <Route path="/userDetails/:id" element={<UserDetails />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
