import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie('jwt_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const setCookie = (name, value, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const handleLogin = (token) => {
    setCookie('jwt_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    document.cookie = 'jwt_token=; Max-Age=0; path=/';
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Header />}
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : (
                <div className="auth-page">
                  <LoginForm onLogin={handleLogin} />
                </div>
              )
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : (
                <div className="auth-page">
                  <RegistrationForm onRegister={handleLogin} />
                </div>
              )
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
            } />
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;