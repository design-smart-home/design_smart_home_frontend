import React, { useState } from 'react';
import { Layout, Menu, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Widget from './Widget';
import Workspace from './Workspace';
//import SliderWidget from './SliderWidget';
//import SwitchWidget from './SwitchWidget';

const { Sider, Content } = Layout;

const CreateDashboard = ({ onSave }) => {
  const [widgets, setWidgets] = useState([]);
  const [dashboardName, setDashboardName] = useState('New Dashboard');

  const availableWidgets = [
    { id: 1, name: 'Слайдер', type: 'slider' },
    { id: 2, name: 'Свитчер', type: 'switch' },
  ];

  const handleAddWidget = (type) => {
    const newWidget = {
      id: Date.now(), // Уникальный ID для каждого виджета
      type, // Сохраняем тип виджета
      position: { 
        x: 50 + Math.random() * 100, // Случайное смещение по X
        y: 50 + Math.random() * 100  // Случайное смещение по Y
      }
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleMoveWidget = (id, newPosition) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, position: newPosition } : widget
    ));
  };

  const handleSave = () => {
    const newDashboard = {
      id: Date.now(),
      name: dashboardName,
      widgets: widgets.map(widget => ({
        ...widget,
        // Удаляем компонент перед сохранением (он будет создаваться при загрузке)
        component: undefined
      })),
    };
    onSave(newDashboard);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Sider width={300} style={{ 
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)'
        }}>
          <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Доступные виджеты</h3>
            <Menu mode="inline" style={{ borderRight: 0 }}>
              {availableWidgets.map((widget) => (
                <Menu.Item key={widget.id} style={{ padding: 0, margin: 0 }}>
                  <Widget 
                    type={widget.type} 
                    onAdd={handleAddWidget}
                  >
                    {widget.name}
                  </Widget>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Sider>

        <Layout>
          <Content style={{ padding: '24px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '16px',
              background: '#fff',
              borderRadius: '4px'
            }}>
              <Input
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                style={{ 
                  width: '300px',
                  fontSize: '20px', 
                  fontWeight: 500,
                  border: 'none',
                  boxShadow: 'none',
                  padding: 0,
                }}
                bordered={false}
              />
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleSave}
                style={{ height: '40px' }}
              >
                Сохранить Dashboard
              </Button>
            </div>
            
            <Workspace 
              widgets={widgets}
              onMoveWidget={handleMoveWidget}
            />
          </Content>
        </Layout>
      </Layout>
    </DndProvider>
  );
};

export default CreateDashboard;