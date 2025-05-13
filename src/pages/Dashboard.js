import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EmptyDashboard from '../components/EmptyDashboard';
import CreateDashboard from '../components/CreateDashboard';
import DashboardView from '../components/DashboardView';
import axios from 'axios';

const { Content } = Layout;

const Dashboard = ({ onLogout }) => {
  const [dashboards, setDashboards] = useState([]);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Получаем JWT токен из cookies
  const getJwtToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; jwt_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Загрузка дашбордов при монтировании компонента
  useEffect(() => {
    const fetchDashboards = async () => {
      const jwtToken = getJwtToken();
      if (!jwtToken) {
        message.error('Требуется авторизация');
        onLogout();
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:80/api/dashboards/all_dashboards/${encodeURIComponent(jwtToken)}`
        );
        setDashboards(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке дашбордов:', error);
        message.error('Не удалось загрузить дашборды');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboards();
  }, [onLogout]);

  const handleCreateDashboard = () => {
    setIsCreatingDashboard(true);
    setCurrentDashboard(null);
  };

  const handleSaveDashboard = async (newDashboard) => {
    const jwtToken = getJwtToken();
    if (!jwtToken) {
      message.error('Требуется авторизация');
      return;
    }

    try {
      // Отправка данных на сервер
      const response = await axios.post(
        'http://127.0.0.1:80/api/dashboards',
        {
          jwt_token: jwtToken,
          ...newDashboard
        }
      );

      // Обновление локального состояния
      const savedDashboard = {
        ...newDashboard,
        id: response.data.dashboard_id
      };
      
      setDashboards([...dashboards, savedDashboard]);
      message.success('Дашборд успешно создан!');
      setIsCreatingDashboard(false);
    } catch (error) {
      console.error('Ошибка при создании дашборда:', error);
      message.error('Не удалось создать дашборд');
    }
  };

  const handleEditDashboard = (dashboard) => {
    setCurrentDashboard(dashboard);
    setIsCreatingDashboard(true);
  };

  const handleDeleteDashboard = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:80/api/dashboards/${id}`);
      setDashboards(dashboards.filter(d => d.id !== id));
      message.success('Дашборд удалён');
    } catch (error) {
      console.error('Ошибка при удалении дашборда:', error);
      message.error('Не удалось удалить дашборд');
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

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
              onCancel={() => setIsCreatingDashboard(false)}
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