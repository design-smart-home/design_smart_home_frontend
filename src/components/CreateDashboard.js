import React, { useState } from 'react';
import { Layout, Menu, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Widget from '../components/Widget';
import Workspace from '../components/Workspace';
import SliderWidget from '../components/SliderWidget';
import SwitchWidget from '../components/SwitchWidget';

const { Sider, Content } = Layout;

const CreateDashboard = ({ onSave }) => {
  const [widgets, setWidgets] = useState([]);
  const [dashboardName, setDashboardName] = useState('New Dashboard');

  const availableWidgets = [
    { id: 1, name: 'Слайдер', type: 'slider' },
    { id: 2, name: 'Свитчер', type: 'switch' },
  ];

  const handleAddWidget = (type, position) => {
    const newWidget = {
      id: Date.now(), // Уникальный идентификатор для каждого виджета
      type: type,
      component: type === 'slider' ? <SliderWidget /> : <SwitchWidget />,
      position: position || { x: 0, y: 0 }, // Позиция по умолчанию
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleSave = () => {
    const newDashboard = {
      id: Date.now(),
      name: dashboardName,
      widgets: widgets,
    };
    onSave(newDashboard);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={300} className="widget-sidebar">
          <div className="widget-list">
            <h3>Widget Box</h3>
            <Menu mode="inline">
              {availableWidgets.map((widget) => (
                <Menu.Item key={widget.id}>
                  <Widget type={widget.type}>{widget.name}</Widget>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Sider>

        <Layout>
          <Content className="workspace-container">
            <div className="workspace-header">
              <Input
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                style={{ fontSize: '24px', border: 'none', outline: 'none', background: 'transparent' }}
              />
              <div className="save-button-container">
                <Button type="primary" icon={<PlusOutlined />} onClick={handleSave}>
                  Сохранить Dashboard
                </Button>
              </div>
            </div>
            <Workspace widgets={widgets} onDrop={handleAddWidget} />
          </Content>
        </Layout>
      </Layout>
    </DndProvider>
  );
};

export default CreateDashboard;