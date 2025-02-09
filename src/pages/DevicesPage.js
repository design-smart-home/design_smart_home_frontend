import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Card from '../components/Card';
import Header from '../components/Header';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);

  // Загрузка устройств при монтировании компонента
  useEffect(() => {
    axios.get('http://localhost:3001/devices')
      .then((response) => setDevices(response.data))
      .catch((error) => console.error('Ошибка при загрузке устройств:', error));
  }, []);

  // Добавление нового устройства
  const addDevice = (name) => {
    axios.post('http://localhost:3001/devices', { name, status: 'ВКЛ/ВЫКЛ' })
      .then((response) => setDevices([...devices, response.data]))
      .catch((error) => console.error('Ошибка при добавлении устройства:', error));
  };

  // Удаление устройства
  const deleteDevice = (id) => {
    axios.delete(`http://localhost:3001/devices/${id}`)
      .then(() => setDevices(devices.filter((device) => device.id !== id)))
      .catch((error) => console.error('Ошибка при удалении устройства:', error));
  };

  // Настройка устройства
  const configureDevice = (id) => {
    console.log(`Настройка устройства ${id}`);
  };

  return (
    <div className="devices-page">
      <Header />
      <div className="content">
        <h2>Устройства</h2>
        <Form onSubmit={addDevice} placeholder="Введите название устройства" />
        {devices.length === 0 ? (
          <p>Устройства отсутствуют. Добавьте новое устройство.</p>
        ) : (
          devices.map((device) => (
            <Card
              key={device.id}
              title={device.name}
              status={device.status}
              onConfigure={() => configureDevice(device.id)}
              onDelete={() => deleteDevice(device.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DevicesPage;