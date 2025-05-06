import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:80/api/login/token', {
        email,
        password
      });
      onLogin(response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
      <button onClick={() => navigate('/register')} className="register-button">
        Sing up
      </button>
    </div>
  );
};

export default LoginForm;