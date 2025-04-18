import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем axios
import Form from '../components/Form';
import Card from '../components/Card';


const HomePage = () => {
  const [scenes, setScenes] = useState([]);

  // Загрузка сцен при монтировании компонента
  useEffect(() => {
    axios.get('http://localhost:3001/scenes')
      .then((response) => setScenes(response.data))
      .catch((error) => console.error('Ошибка при загрузке сцен:', error));
  }, []);

  // Добавление новой сцены
  const addScene = (name) => {
    axios.post('http://localhost:3001/scenes', { name, status: 'ВКЛ/ВЫКЛ' })
      .then((response) => setScenes([...scenes, response.data]))
      .catch((error) => console.error('Ошибка при добавлении сцены:', error));
  };

  // Удаление сцены
  const deleteScene = (id) => {
    axios.delete(`http://localhost:3001/scenes/${id}`)
      .then(() => setScenes(scenes.filter((scene) => scene.id !== id)))
      .catch((error) => console.error('Ошибка при удалении сцены:', error));
  };

  // Настройка сцены
  const configureScene = (id) => {
    console.log(`Настройка сцены ${id}`);
  };

  return (
    <div className="home-page">
      <div className="content">
        <h2>Сцены</h2>
        <Form onSubmit={addScene} placeholder="Введите название сцены" />
        {scenes.length === 0 ? (
          <p>Сцены отсутствуют. Добавьте новую сцену.</p>
        ) : (
          scenes.map((scene) => (
            <Card
              key={scene.id}
              title={scene.name}
              status={scene.status}
              onConfigure={() => configureScene(scene.id)}
              onDelete={() => deleteScene(scene.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;