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
           

          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
