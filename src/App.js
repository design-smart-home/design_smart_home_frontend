import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScenarioPage from './pages/ScenarioPage';
import DevicesPage from './pages/DevicesPage';
import NotFound from './pages/NotFound';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false); // Новое состояние для отслеживания регистрации

  // Функция для обработки входа
  const handleLogin = (email, password) => {
    console.log('Вход:', email, password);
    setIsLoggedIn(true);
    setRegistered(false); // Сбрасываем флаг регистрации после входа
  };

  // Функция для обработки регистрации
  const handleRegister = (email, password) => {
    console.log('Регистрация:', email, password);
    setRegistered(true); // Устанавливаем флаг регистрации
    // Не устанавливаем isLoggedIn в true, чтобы пользователь вошел через авторизацию
  };

  // Функция для выхода
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Верхняя шапка */}
      <Header />

      {/* Основной контент */}
      <div style={{ display: 'flex' }}>
        {/* Боковая панель (отображается только для авторизованных пользователей) */}
        {isLoggedIn && <Sidebar />}

        {/* Основной контент */}
        <div className="main-content">
          <Routes>
            {/* Главная страница — это страница авторизации */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : registered ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />

            {/* Страница регистрации */}
            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" />
                ) : registered ? (
                  <Navigate to="/" />
                ) : (
                  <RegistrationForm onRegister={handleRegister} />
                )
              }
            />

            {/* Защищенные маршруты */}
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <HomePage onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/scenarios"
              element={
                isLoggedIn ? (
                  <ScenarioPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/devices"
              element={
                isLoggedIn ? (
                  <DevicesPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Страница 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;