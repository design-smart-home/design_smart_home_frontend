import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Button, message } from 'antd';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('');
  const [currentValue, setCurrentValue] = useState(0);

  // Получаем JWT токен из cookies
  const getJwtToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; jwt_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Загрузка устройств при монтировании компонента
  useEffect(() => {
    const fetchDevices = async () => {
      const jwtToken = getJwtToken();
      if (!jwtToken) {
        message.error('Требуется авторизация');
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:80/api/devices/all_devices/${encodeURIComponent(jwtToken)}`
        );
        setDevices(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке устройств:', error);
        message.error('Не удалось загрузить устройства');
      }
    };

    fetchDevices();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setDataType('');
    setCurrentValue(0);
  };

  // Добавление нового устройства
  const addDevice = async () => {
    const jwtToken = getJwtToken();
    if (!jwtToken) {
      message.error('Требуется авторизация');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:80/api/devices',
        {
          jwt_token: jwtToken,
          name: name,
          data_type: dataType,
          current_value: currentValue
        }
      );

      // Обновляем список устройств
      const newDevice = {
        id: response.data.device_id,
        name: name,
        data_type: dataType,
        current_value: currentValue,
        status: 'АКТИВНО',
      };
      
      setDevices([...devices, newDevice]);
      message.success('Устройство успешно добавлено!');
      closeModal();
    } catch (error) {
      console.error('Ошибка при добавлении устройства:', error);
      message.error('Не удалось добавить устройство');
    }
  };

  // Удаление устройства
  const deleteDevice = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:80/api/devices/${id}`);
      setDevices(devices.filter((device) => device.id !== id));
      message.success('Устройство удалено');
    } catch (error) {
      console.error('Ошибка при удалении устройства:', error);
      message.error('Не удалось удалить устройство');
    }
  };

  // Настройка устройства
  const configureDevice = (id) => {
    console.log(`Настройка устройства ${id}`);
  };

  return (
    <div className="devices-page">
      <div className="content">
        <h2>Устройства</h2>
        <Button type='primary' onClick={openModal}>Добавить устройство</Button>

        {devices.length === 0 ? (
          <p>Устройства отсутствуют. Добавьте новое устройство.</p>
        ) : (
          devices.map((device) => (
            <Card
              key={device.id}
              title={device.name}
              status={device.status || 'АКТИВНО'}
              onConfigure={() => configureDevice(device.id)}
              onDelete={() => deleteDevice(device.id)}
            />
          ))
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3>Добавить устройство</h3>
          <input
            type="text"
            placeholder="Название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Тип данных"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Текущее значение"
            value={currentValue}
            onChange={(e) => setCurrentValue(parseInt(e.target.value))}
            required
          />
          <button onClick={addDevice}>Добавить</button>
        </Modal>
      </div>
    </div>
  );
};

export default DevicesPage;