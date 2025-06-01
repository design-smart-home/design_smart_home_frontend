import React from 'react';
import { Switch, Card, Tag } from 'antd';

const SwitchWidget = ({ value = false, onChange, device }) => {
  const handleChange = (checked) => {
    if (onChange) {
      onChange(checked ? 1 : 0); // Для совместимости с IoT устройствами
    }
  };

  return (
    <Card 
      title={
        <div>
          Переключатель
          <Tag 
            color={device?.name === 'Не привязано' ? 'red' : 'green'} 
            style={{ marginLeft: 8 }}
          >
            {device?.name}
          </Tag>
        </div>
      } 
      size="small"
      style={{ width: 220 }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Switch
          checked={value}
          onChange={handleChange}
          checkedChildren="ON"
          unCheckedChildren="OFF"
        />
        <div style={{ marginLeft: 16 }}>
          Текущее: {value ? 'ON' : 'OFF'}
        </div>
      </div>
    </Card>
  );
};

export default SwitchWidget;