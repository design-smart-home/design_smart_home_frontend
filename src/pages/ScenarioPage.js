import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем axios
import Form from '../components/Form';
import Card from '../components/Card';

const ScenarioPage = () => {
  const [scenarios, setScenarios] = useState([]);

  // Загрузка сценариев
  useEffect(() => {
    axios.get('http://localhost:3001/scenarios')
      .then((response) => setScenarios(response.data))
      .catch((error) => console.error('Ошибка при загрузке сценариев:', error));
  }, []);

  // Добавление сценария
  const addScenario = (name) => {
    axios.post('http://localhost:3001/scenarios', { name, status: 'ВКЛ/ВЫКЛ' })
      .then((response) => setScenarios([...scenarios, response.data]))
      .catch((error) => console.error('Ошибка при добавлении сценария:', error));
  };

  // Удаление сценария
  const deleteScenario = (id) => {
    axios.delete(`http://localhost:3001/scenarios/${id}`)
      .then(() => setScenarios(scenarios.filter((scenario) => scenario.id !== id)))
      .catch((error) => console.error('Ошибка при удалении сценария:', error));
  };

  // Настройка сценария
  const configureScenario = (id) => {
    console.log(`Настройка сценария ${id}`);
  };

  return (
    <div className="scenario-page">
      <div className="content">
        <h2>Сценарии</h2>
        <Form onSubmit={addScenario} placeholder="Введите название сценария" />
        {scenarios.length === 0 ? (
          <p>Сценарии отсутствуют. Добавьте новый сценарий.</p>
        ) : (
          scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              title={scenario.name}
              status={scenario.status}
              onConfigure={() => configureScenario(scenario.id)}
              onDelete={() => deleteScenario(scenario.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScenarioPage;