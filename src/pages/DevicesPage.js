import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Button } from 'antd';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('');
  const [currentValue, setCurrentValue] = useState(0);

  // Загрузка устройств при монтировании компонента
  // useEffect(() => {
    //axios.get('http://31.128.49.209/api/devices')
    // axios.get('http://127.0.0.1:8000/devices')
      // .then((response) => setDevices(response.data))
      // .catch((error) => console.error('Ошибка при загрузке устройств:', error));
  // }, []);

  
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
  const addDevice = () => {
    //axios.post('http://31.128.49.209/api/devices', 
    axios.post('http://127.0.0.1:8000/devices/', {
      name: name,          // Название устройства
      data_type: dataType, // Тип данных устройства
      range_value: [],     // Пустой список
      current_value: currentValue, // Текущее значение
    })
      .then((response) => {
        // В ответе будет device_id
        const newDevice = {
          id: response.data.device_id,
          name: name,
          data_type: dataType,
          current_value: currentValue,
          status: 'ВКЛ/ВЫКЛ', 
        };
        setDevices([...devices, newDevice]); // Добавляем новое устройство в список
        closeModal(); 
      })
      .catch((error) => console.error('Ошибка при добавлении устройства:', error));
  };

  // Удаление устройства
  const deleteDevice = (id) => {
    axios.delete(`http://31.128.49.209/api/devices/${id}`)
      .then(() => setDevices(devices.filter((device) => device.id !== id)))
      .catch((error) => console.error('Ошибка при удалении устройства:', error));
  };

  // Настройка устройства
  const configureDevice = (id) => {
    console.log(`Настройка устройства ${id}`);
  };

  return (
    <div className="devices-page">
      <div className="content">
        <h2>Устройства</h2>
        <Button type='primary' onClick={openModal}>Добавить устройство</Button> {/* Кнопка для открытия модального окна */}

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

        {/* Модальное окно для добавления устройства */}
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