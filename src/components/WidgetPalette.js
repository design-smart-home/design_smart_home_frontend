import React from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';

const WidgetPalette = ({ onAddWidget }) => {
  const widgets = [
    { type: 'switch', label: 'Переключатель' },
    { type: 'slider', label: 'Слайдер' },
    { type: 'gauge', label: 'Индикатор' }
  ];

  return (
    <div style={{ width: '200px', marginRight: '20px' }}>
      <h3>Виджеты</h3>
      {widgets.map(({ type, label }) => (
        <WidgetItem 
          key={type}
          type={type}
          label={label}
          onAdd={onAddWidget}
        />
      ))}
    </div>
  );
};

const WidgetItem = ({ type, label, onAdd }) => {
  const [, drag] = useDrag(() => ({
    type: 'widget',
    item: { type },
  }));

  return (
    <div
      ref={drag}
      onClick={() => onAdd(type)}
      style={{
        padding: '10px',
        margin: '5px 0',
        border: '1px dashed #ddd',
        cursor: 'move',
        background: '#fafafa'
      }}
    >
      {label}
    </div>
  );
};

export default WidgetPalette;