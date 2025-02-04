import React, { useState } from 'react';
import Form from '../components/Form';
import Card from '../components/Card';
import Header from '../components/Header';

const HomePage = () => {
  const [scenes, setScenes] = useState([]);

  const addScene = (name) => {
    setScenes([...scenes, { name, status: 'ВКЛ/ВЫКЛ' }]);
  };

  const deleteScene = (index) => {
    setScenes(scenes.filter((_, i) => i !== index));
  };

  const configureScene = (index) => {
    console.log(`Настройка сцены ${index}`);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <h2>Сцены</h2>
        <Form onSubmit={addScene} />
        {scenes.length === 0 ? (
          <p>Сцены отсутствуют. Добавьте новую сцену.</p>
        ) : (
          scenes.map((scene, index) => (
            <Card
              key={index}
              title={scene.name}
              status={scene.status}
              onConfigure={() => configureScene(index)}
              onDelete={() => deleteScene(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;