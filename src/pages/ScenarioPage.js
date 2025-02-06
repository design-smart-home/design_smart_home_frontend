import React, { useState } from 'react';
import Form from '../components/Form';
import Card from '../components/Card';
import Header from '../components/Header';

const ScenarioPage = () => {
  const [scenarios, setScenarios] = useState([]);

  const addScenario = (name) => {
    setScenarios([...scenarios, { name, status: 'ВКЛ/ВЫКЛ' }]);
  };

  const deleteScenario = (index) => {
    setScenarios(scenarios.filter((_, i) => i !== index));
  };

  const configureScenario = (index) => {
    console.log(`Настройка сценария ${index}`);
  };

  return (
    <div className="scenario-page">
      <Header />
      <div className="content">
        <h2>Сценарии</h2>
        <Form onSubmit={addScenario} placeholder="Введите название сценария" />
        {scenarios.length === 0 ? (
          <p>Сценарии отсутствуют. Добавьте новый сценарий.</p>
        ) : (
          scenarios.map((scenario, index) => (
            <Card
              key={index}
              title={scenario.name}
              status={scenario.status}
              onConfigure={() => configureScenario(index)}
              onDelete={() => deleteScenario(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScenarioPage;