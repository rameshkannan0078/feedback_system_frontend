import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninForm from './Routes/signin/signin';
import SignupForm from './Routes/signup/signup';
import WelcomeComponent from './Routes/welcome/welcome';
import HomePage from './Routes/feedback/home/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviousFeedback from './Routes/feedback/previousFeedback/previousFeedback';
import { PrivateRoute } from './Routes/privateRoute/privateRoute';
import { AdminPrivateRoute } from './Routes/privateRoute/privateRoute';
import AdminLogin from './Routes/admin/adminLogin';
import AdminHomepage from './Routes/admin/adminHome';
import AdminDashboard from './Routes/admin/adminDashboard';
import AdminUserList from './Routes/admin/adminUserList';


function App() {

  return (
    <Router>

      <ToastContainer />
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/adminhome' element={<AdminPrivateRoute><AdminHomepage /></AdminPrivateRoute>} />
        <Route path='/adminuser' element={<AdminPrivateRoute><AdminUserList></AdminUserList></AdminPrivateRoute>} />
        <Route path='/admindashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/previous-feedback" element={<PrivateRoute><PreviousFeedback /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
