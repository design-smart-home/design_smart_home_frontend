import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Input, Select, Table, Divider, Tag, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { createDevice, deleteDevice, getDevices } from '../api/deviceApi';

const { Option } = Select;

const DevicesPage = () => {
  const { jwtToken } = useAuth();
  const [devices, setDevices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    controller: "ESP32",
    pins: [{ pin: "", type: "digital", mode: "output" }]
  });
  const [loading, setLoading] = useState({
    devices: false,
    create: false,
    delete: false
  });

  // Загрузка устройств
  const fetchDevices = async () => {
    setLoading(prev => ({ ...prev, devices: true }));
    try {
      const response = await getDevices(jwtToken);
      setDevices(response.data || response);
    } catch (error) {
      message.error('Не удалось загрузить устройства');
      console.error('Ошибка:', error.response?.data || error.message);
    } finally {
      setLoading(prev => ({ ...prev, devices: false }));
    }
  };

  // Создание устройства
  const handleCreateDevice = async () => {
    if (!newDevice.name || newDevice.pins.some(p => !p.pin)) {
      message.error("Заполните все обязательные поля!");
      return;
    }

    setLoading(prev => ({ ...prev, create: true }));
    try {
      const deviceData = {
        jwt_token: jwtToken,
        name: newDevice.name,
        controller: newDevice.controller,
        pins: newDevice.pins.map(pin => ({
          pin: pin.pin,
          type: pin.type,
          mode: pin.mode,
          id: pin.id || generateUUID()
        }))
      };

      const response = await createDevice(jwtToken, deviceData);
      
      message.success(`Устройство ${response.data?.name || response.name} создано!`);
      setIsModalOpen(false);
      setNewDevice({
        name: "",
        controller: "ESP32",
        pins: [{ pin: "", type: "digital", mode: "output" }]
      });
      fetchDevices();
    } catch (error) {
      message.error(error.response?.data?.message || 'Ошибка при создании устройства');
      console.error('Ошибка:', error.response?.data || error.message);
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  };

  // Удаление устройства
  const handleDeleteDevice = async (deviceId) => {
    setLoading(prev => ({ ...prev, delete: true }));
    try {
      await deleteDevice(jwtToken, deviceId);
      message.success('Устройство удалено');
      fetchDevices();
    } catch (error) {
      message.error(error.response?.data?.message || 'Ошибка при удалении устройства');
      console.error('Ошибка:', error.response?.data || error.message);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  // Загрузка при монтировании
  useEffect(() => {
    fetchDevices();
  }, [jwtToken]);

  // Генерация UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  return (
    <div className='devices-page'>
      <Button 
        type="primary" 
        onClick={() => setIsModalOpen(true)}
        loading={loading.devices || loading.delete}
      >
        Добавить устройство
      </Button>

      <Modal
        title="Новое устройство"
        open={isModalOpen}
        onOk={handleCreateDevice}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading.create}
        width={700}
      >
        <Input
          placeholder="Название (ESP32 Кухня)"
          value={newDevice.name}
          onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
          style={{ marginBottom: 16 }}
        />
        
        <Select
          value={newDevice.controller}
          onChange={(controller) => setNewDevice({...newDevice, controller})}
          style={{ width: '100%', marginBottom: 16 }}
        >
          <Option value="ESP32">ESP32</Option>
          <Option value="Arduino">Arduino</Option>
          <Option value="Raspberry">Raspberry Pi</Option>
        </Select>

        <Divider orientation="left">Конфигурация пинов</Divider>
        {newDevice.pins.map((pin, index) => (
          <div key={index} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <Input
              placeholder="Пин (D12, A0)"
              value={pin.pin}
              onChange={(e) => {
                const newPins = [...newDevice.pins];
                newPins[index].pin = e.target.value.toUpperCase();
                setNewDevice({...newDevice, pins: newPins});
              }}
              style={{ width: 120 }}
            />
            <Select
              value={pin.type}
              onChange={(type) => {
                const newPins = [...newDevice.pins];
                newPins[index].type = type;
                setNewDevice({...newDevice, pins: newPins});
              }}
              style={{ width: 120 }}
            >
              <Option value="digital">Цифровой</Option>
              <Option value="analog">Аналоговый</Option>
            </Select>
            <Select
              value={pin.mode}
              onChange={(mode) => {
                const newPins = [...newDevice.pins];
                newPins[index].mode = mode;
                setNewDevice({...newDevice, pins: newPins});
              }}
              style={{ width: 120 }}
            >
              <Option value="input">Input</Option>
              <Option value="output">Output</Option>
            </Select>
            <Button 
              danger 
              onClick={() => {
                const newPins = [...newDevice.pins];
                newPins.splice(index, 1);
                setNewDevice({...newDevice, pins: newPins});
              }}
            >
              Удалить
            </Button>
          </div>
        ))}
        <Button onClick={() => setNewDevice({
          ...newDevice,
          pins: [...newDevice.pins, { pin: "", type: "digital", mode: "output" }]
        })}>
          Добавить пин
        </Button>
      </Modal>

      <div style={{ marginTop: 20 }}>
        {devices.map(device => (
          <Card 
            key={device.device_id} 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{device.controller}: {device.name}</span>
                <Tag color="green" style={{ marginLeft: 10 }}>
                  online
                </Tag>
              </div>
            }
            extra={
              <Button 
                danger 
                onClick={() => handleDeleteDevice(device.device_id)}
                loading={loading.delete}
              >
                Удалить
              </Button>
            }
            style={{ marginBottom: 20 }}
          >
            <Table
              columns={[
                { title: 'Пин', dataIndex: 'pin', key: 'pin' },
                { 
                  title: 'Тип', 
                  dataIndex: 'type',
                  key: 'type'
                },
                { 
                  title: 'Режим', 
                  dataIndex: 'mode',
                  key: 'mode'
                }
              ]}
              dataSource={device.pins?.map((pin, index) => ({ 
                ...pin,
                key: pin.id || index
              })) || []}
              size="small"
              pagination={false}
              loading={loading.devices}
              locale={{ emptyText: 'Нет данных о пинах' }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;