import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ApiOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider 
      width={250} 
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        zIndex: 10
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{
          height: '100%',
          borderRight: 0,
          paddingTop: '16px'
        }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Панель управления</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/dashboard/1/view">Мои дашборды</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
          <Link to="/analytics">Аналитика</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          <Link to="/settings">Настройки</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;