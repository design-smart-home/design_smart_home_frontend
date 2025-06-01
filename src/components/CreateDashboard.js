import React, { useState } from 'react';
import { Layout, Menu, Button, Input, Select, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Widget from '../components/Widget';
import Workspace from '../components/Workspace';

const { Sider, Content } = Layout;

const CreateDashboard = ({ onSave, dashboard, devices, onCancel }) => {
  const [widgets, setWidgets] = useState(dashboard?.widgets || []);
  const [dashboardName, setDashboardName] = useState(dashboard?.name || 'Новый дашборд');
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleAddWidget = (type) => {
    const newWidget = {
      id: Date.now(),
      type,
      position: { x: 50, y: 50 },
      deviceId: null
    };
    setWidgets([...widgets, newWidget]);
    setSelectedWidget(newWidget.id);
  };

  const handleSaveDevice = () => {
    setWidgets(widgets.map(w => 
      w.id === selectedWidget ? { ...w, deviceId: selectedDevice } : w
    ));
    setSelectedWidget(null);
  };

  const handleSave = () => {
    onSave({
      id: dashboard?.id || Date.now(),
      name: dashboardName,
      widgets
    });
    onCancel();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Sider width={250} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px' }}>
            <h3>Доступные виджеты</h3>
            <Menu mode="inline">
              <Menu.Item key="slider">
                <Widget type="slider" onAdd={handleAddWidget}>Слайдер</Widget>
              </Menu.Item>
              <Menu.Item key="switch">
                <Widget type="switch" onAdd={handleAddWidget}>Свитчер</Widget>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>

        <Layout>
          <Content style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Input
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                style={{ width: '300px', fontSize: '20px' }}
              />
              <div>
                <Button style={{ marginRight: 8 }} onClick={onCancel}>
                  Отмена
                </Button>
                <Button type="primary" onClick={handleSave}>
                  Сохранить
                </Button>
              </div>
            </div>
            
            <Workspace 
              widgets={widgets} 
              onMoveWidget={(id, pos) => 
                setWidgets(widgets.map(w => w.id === id ? { ...w, position: pos } : w))
              } 
            />

            <Modal
              title="Выберите устройство"
              open={!!selectedWidget}
              onOk={handleSaveDevice}
              onCancel={() => setSelectedWidget(null)}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Выберите устройство"
                onChange={setSelectedDevice}
              >
                {devices
                  .filter(d => widgets.find(w => w.id === selectedWidget)?.type === 'switch' 
                    ? d.data_type === 'switch'
                    : d.data_type === 'slider')
                  .map(device => (
                    <Select.Option key={device.id} value={device.id}>
                      {device.name}
                    </Select.Option>
                  ))}
              </Select>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </DndProvider>
  );
};

export default CreateDashboard;