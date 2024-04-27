import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import UserProfile from './pages/Profile/UserProfile';
import PaymentProfile from './pages/Profile/PaymentProfile';
import UpdateProfile from './pages/Profile/UpdateProfile';
import Logout from './pages/Logout/Logout';
import Error from './pages/Error/Error';
import UserAdmin from './pages/Admin/UserAdmin';
import PaymentAdmin from './pages/Admin/PaymentAdmin';
import UpdateAdmin from './pages/Admin/UpdateAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:UserID/user" element={<UserProfile />} />
        <Route path="/profile/:UserID/payment" element={<PaymentProfile />} />
        <Route path="/profile/:UserID/update" element={<UpdateProfile />} />
        <Route path="/admin/:UserID/users" element={<UserAdmin />} />
        <Route path="/admin/:UserID/payments" element={<PaymentAdmin />} />
        <Route path="/admin/:UserID/updates" element={<UpdateAdmin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error error="This page cannot be found." />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
