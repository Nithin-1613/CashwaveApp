import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InsuranceMainPage from './Components/InsuranceMainPage';
import LinkAccount from './Components/LinkAccount';
import InsuranceDetails from './Components/InsuranceDetails';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './Redux/store';
import PaymentPage from './Components/PaymentPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InsuranceMainPage />} />
            <Route path="/linkAccount" element={<LinkAccount />} />
            <Route path="/paymentpage" element={<PaymentPage/>} />
            {/* <Route path="/insuranceDetails" element={<InsuranceDetails />} /> */}
            {/* This route doesn't have a parameter */}
            <Route path="/insuranceDetails/:policynumber" element={<InsuranceDetails />} />
           

          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
