import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SigninForm from './Routes/signin/signin';
import SignupForm from './Routes/signup/signup';
import WelcomeComponent from './Routes/welcome/welcome';
import HomePage from './Routes/feedback/home/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviousFeedback from './Routes/feedback/previousFeedback/previousFeedback';
import PrivateRoute from './Routes/privateRoute/privateRoute';
import AdminLogin from './Routes/admin/adminLogin';
import AdminHomepage from './Routes/admin/adminHome';
import AdminDashboard from './Routes/admin/adminDashboard';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHomepage/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/previous-feedback" element={<PrivateRoute><PreviousFeedback /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
