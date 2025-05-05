import React, { useState } from 'react';
import { Layout, Button, Card, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EmptyDashboard from '../components/EmptyDashboard';
import CreateDashboard from '../components/CreateDashboard';
import DashboardView from '../components/DashboardView';

const { Content } = Layout;

const Dashboard = () => {
  const [dashboards, setDashboards] = useState([]);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState(null);

  const handleCreateDashboard = () => {
    setIsCreatingDashboard(true);
    setCurrentDashboard(null);
  };

  const handleSaveDashboard = (newDashboard) => {
    setDashboards([...dashboards, newDashboard]);
    setIsCreatingDashboard(false);
  };

  const handleEditDashboard = (dashboard) => {
    setCurrentDashboard(dashboard);
    setIsCreatingDashboard(true);
  };

  const handleDeleteDashboard = (id) => {
    setDashboards(dashboards.filter(d => d.id !== id));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {dashboards.length === 0 && !isCreatingDashboard ? (
            <EmptyDashboard onCreateDashboard={handleCreateDashboard} />
          ) : isCreatingDashboard ? (
            <CreateDashboard 
              onSave={handleSaveDashboard} 
              dashboard={currentDashboard}
            />
          ) : (
            <div className="dashboard-container">
              <div className="dashboard-header">
                <h1>Мои дашборды</h1>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={handleCreateDashboard}
                >
                  Новый дашборд
                </Button>
              </div>
              
              <div className="dashboard-list">
                {dashboards.map((dashboard) => (
                  <DashboardView
                    key={dashboard.id}
                    dashboard={dashboard}
                    onEdit={handleEditDashboard}
                    onDelete={handleDeleteDashboard}
                  />
                ))}
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;