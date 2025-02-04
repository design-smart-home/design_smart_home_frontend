import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите название сцены"
      />
      <button type="submit">Добавить сцену</button>
    </form>
  );
};

export default Form;
