import React from 'react';

const Card = ({ title, status, dataType, currentValue, onConfigure, onDelete }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>Тип данных: {dataType}</p>
    <p>Текущее значение: {currentValue}</p>
    <p>Статус: {status}</p>
    <button onClick={onConfigure}>Настройка</button>
    <button onClick={onDelete}>Удалить</button>
  </div>
);

export default Card;