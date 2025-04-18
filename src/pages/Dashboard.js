import React, { useState } from 'react';
import { Layout } from 'antd';
//import Sidebar from '../components/Sidebar';
import EmptyDashboard from '../components/EmptyDashboard';
import CreateDashboard from '../components/CreateDashboard'; 


const { Content } = Layout;

const Dashboard = () => {
  const [dashboards, setDashboards] = useState([]); 
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);

  const handleCreateDashboard = () => {
    setIsCreatingDashboard(true);
  };

  const handleSaveDashboard = (newDashboard) => {
    setDashboards([...dashboards, newDashboard]);
    setIsCreatingDashboard(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sidebar /> */}
      <Layout>
        <Content style={{ padding: '24px'}}>
          {dashboards.length === 0 && !isCreatingDashboard ? (
            <EmptyDashboard onCreateDashboard={handleCreateDashboard} />
          ) : isCreatingDashboard ? (
            <CreateDashboard onSave={handleSaveDashboard} /> /* Используем CreateDashboard */
          ) : (
            <div>
              <h1>Мои дашборды</h1>
              {dashboards.map((dashboard) => (
                <div key={dashboard.id}>
                  <h2>{dashboard.name}</h2>
                  {/* Здесь можно отображать виджеты дашборда */}
                </div>
              ))}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;