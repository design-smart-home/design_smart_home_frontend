import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import ViewDashboard from './pages/ViewDashboardpage';
import DevicesPage from './pages/DevicesPage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotFound from './components/NotFound';

const { Content } = Layout;

const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Пути, которые доступны без авторизации
  const isAuthRoute = ['/login', '/register'].includes(location.pathname);

  if (!user && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {user && (
        <>
          <Header />
          <Layout>
            <Sidebar />
            <Content style={{ padding: '24px', background: '#f0f2f5' }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id/view" element={<ViewDashboard />} />
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
          </Layout>
        </>
      )}
      
      {!user && (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;