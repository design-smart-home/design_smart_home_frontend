import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>Наше название</h1>
    <nav>
      <Link to="/devices">Устройства</Link> 
      <Link to="/scenarios">Сценарии</Link>
      <Link to="/">Сцены</Link>
      <Link to="/settings">Настройки</Link>
      <Link to="/logout">Выход</Link>
    </nav>
  </header>
);

export default Header;