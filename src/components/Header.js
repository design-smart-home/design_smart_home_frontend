import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { 
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const HeaderComponent = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Профиль</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Настройки</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Выход
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{
      background: '#0056b3',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      width: '100%',
      zIndex: 9,
      height: 64,
      lineHeight: '64px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>IoT Панель</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge count={5} style={{ marginRight: 24 }}>
          <BellOutlined style={{ fontSize: 18, color: '#fff' }} />
        </Badge>
        
        <Dropdown overlay={menu} trigger={['click']}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar 
              style={{ backgroundColor: '#fff', color: '#0056b3' }} 
              icon={<UserOutlined />} 
            />
            <span style={{ marginLeft: 8, color: '#fff' }}>{user.username}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;