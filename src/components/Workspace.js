import React, { useEffect, useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import DraggableWidget from './DraggableWidget';
import SliderWidget from './SliderWidget';
import SwitchWidget from './SwitchWidget';
import { 
  getDashboardWidgets, 
  createWidget, 
  updateWidget 
} from '../api/widgetApi';
import { useAuth } from '../context/AuthContext';

const Workspace = ({ dashboardId, controllers }) => {
  const { jwtToken } = useAuth();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const workspaceRef = useRef(null);

  // Загрузка виджетов
  useEffect(() => {
    const loadWidgets = async () => {
      setLoading(true);
      try {
        const data = await getDashboardWidgets(jwtToken, dashboardId);
        setWidgets(data);
      } catch (error) {
        console.error('Ошибка загрузки виджетов:', error);
      } finally {
        setLoading(false);
      }
    };

    if (dashboardId) {
      loadWidgets();
    }
  }, [dashboardId, jwtToken]);

  // Обработка перетаскивания
  const [, drop] = useDrop({
    accept: 'widget',
    drop(item, monitor) {
      if (!workspaceRef.current) return;
      
      const offset = monitor.getClientOffset();
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      
      const position = {
        x: offset.x - workspaceRect.left + workspaceRef.current.scrollLeft,
        y: offset.y - workspaceRect.top + workspaceRef.current.scrollTop
      };

      if (item.id) {
        handleMoveWidget(item.id, position);
      } else {
        handleAddWidget(item.type, position);
      }
    }
  });

  // Добавление виджета
  const handleAddWidget = async (type, position) => {
    try {
      const newWidget = {
        type_widget: type,
        name: `Новый ${type === 'slider' ? 'Слайдер' : 'Переключатель'}`,
        position,
        data_type: type === 'slider' ? 'number' : 'boolean',
        min_value: type === 'slider' ? 0 : 0,
        max_value: type === 'slider' ? 100 : 1,
        current_value: type === 'slider' ? 50 : 0,
        dashboard_id: dashboardId
      };

      const createdWidget = await createWidget(jwtToken, newWidget);
      setWidgets([...widgets, createdWidget]);
    } catch (error) {
      console.error('Ошибка создания виджета:', error);
    }
  };

  // Перемещение виджета
  const handleMoveWidget = async (id, position) => {
    try {
      await updateWidget(jwtToken, id, { position });
      setWidgets(prevWidgets => 
        prevWidgets.map(w => 
          w.id === id ? { ...w, position } : w
        )
      );
    } catch (error) {
      console.error('Ошибка перемещения виджета:', error);
    }
  };

  // Изменение значения виджета
  const handleWidgetChange = async (id, value) => {
    try {
      await updateWidget(jwtToken, id, { current_value: value });
      setWidgets(prevWidgets => 
        prevWidgets.map(w => 
          w.id === id ? { ...w, current_value: value } : w
        )
      );
    } catch (error) {
      console.error('Ошибка обновления значения:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '500px' 
      }}>
        Загрузка виджетов...
      </div>
    );
  }

  return (
    <div 
      ref={(node) => {
        drop(node);
        workspaceRef.current = node;
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        border: '1px dashed #ccc',
        backgroundColor: '#fafafa',
        overflow: 'auto'
      }}
    >
      {widgets.map(widget => {
        const controller = controllers.find(c => c.id === widget.controller_id);
        const pin = controller?.pins.find(p => p.pin === widget.pin);
        
        return (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            type={widget.type_widget}
            position={widget.position || { x: 50, y: 50 }}
            onMove={handleMoveWidget}
            containerRef={workspaceRef}
          >
            {widget.type_widget === 'slider' ? (
              <SliderWidget
                widgetId={widget.id}
                value={widget.current_value}
                min={widget.min_value}
                max={widget.max_value}
                onChange={(value) => handleWidgetChange(widget.id, value)}
                device={{ 
                  name: controller ? `${controller.name} (${pin?.pin})` : 'Не привязано'
                }}
              />
            ) : (
              <SwitchWidget
                widgetId={widget.id}
                value={widget.current_value}
                onChange={(value) => handleWidgetChange(widget.id, value ? 1 : 0)}
                device={{ 
                  name: controller ? `${controller.name} (${pin?.pin})` : 'Не привязано'
                }}
              />
            )}
          </DraggableWidget>
        );
      })}
    </div>
  );
};

export default Workspace;