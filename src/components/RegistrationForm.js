import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegistrationForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 1. Регистрация
      await axios.post('http://127.0.0.1:80/api/users', {
        username,
        email,
        hashed_password: password
      });

      // 2. Автоматический вход
      const loginResponse = await axios.post('http://127.0.0.1:80/api/login/token', {
        email,
        password
      });

      onRegister(loginResponse.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
          />
        </div>
        <button type="submit">Sing up</button>
      </form>
      <button onClick={() => navigate('/')} className="back-button">
        Log in
      </button>
    </div>
  );
};

export default RegistrationForm;