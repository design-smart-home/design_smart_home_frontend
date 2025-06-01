import React, { useEffect, useState } from 'react';
import { Slider, Card, Tag, message } from 'antd';
import { getWidget, updateWidget } from '../api/widgetApi';
import { useAuth } from '../context/AuthContext';

const SliderWidget = ({ widgetId, device, onChange }) => {
  const { jwtToken } = useAuth();
  const [value, setValue] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWidgetData = async () => {
      try {
        setLoading(true);
        const widgetData = await getWidget(jwtToken, widgetId);
        setValue(widgetData.current_value);
      } catch (error) {
        message.error('Ошибка загрузки данных виджета');
      } finally {
        setLoading(false);
      }
    };

    if (widgetId) {
      loadWidgetData();
    }
  }, [widgetId, jwtToken]);

  const handleChange = async (newValue) => {
    try {
      setValue(newValue);
      await updateWidget(jwtToken, widgetId, { current_value: newValue });
      if (onChange) onChange(newValue);
    } catch (error) {
      message.error('Ошибка сохранения значения');
      setValue(value); // Откат при ошибке
    }
  };

  return (
    <Card 
      title={
        <div>
          Слайдер
          <Tag 
            color={device?.name === 'Не привязано' ? 'red' : 'green'} 
            style={{ marginLeft: 8 }}
          >
            {device?.name}
          </Tag>
        </div>
      } 
      size="small"
      style={{ width: 280 }}
    >
      <div style={{ padding: '0 10px' }}>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          disabled={loading}
        />
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          Текущее значение: {value}
        </div>
      </div>
    </Card>
  );
};

export default SliderWidget;