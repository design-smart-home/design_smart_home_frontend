import React from 'react';

const Card = ({ title, status, onConfigure, onDelete }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{status}</p>
    <button onClick={onConfigure}>Настройка</button>
    <button onClick={onDelete}>Удалить</button>
  </div>
);

export default Card;
