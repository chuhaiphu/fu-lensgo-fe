import CompleteRegister from './CustomerRegister/CompleteRegister';
import CustomerRegister from './CustomerRegister/CustomerRegister';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotographerRegister from './PhotographerRegister/PhotographerRegister';

export default function Auth() {
  return (
    <Router> 
      <Routes>
        {/* Define your routes inside Routes */}
        <Route path="/login" element={<Login />} /> {/* Default route */}
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/complete-register" element={<CompleteRegister />} />
        <Route path="/photographer-register" element={<PhotographerRegister />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}
