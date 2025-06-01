import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: 'http://127.0.0.1.80/api/dashboards',
});

export const getDashboards = async () => {
  const { jwtToken } = useAuth();
  const response = await api.get('/', {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const createDashboard = async (name, widgets = []) => {
  const { jwtToken } = useAuth();
  const response = await api.post('/', { name, widgets_ids: widgets }, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const deleteDashboard = async (dashboardId) => {
  const { jwtToken } = useAuth();
  await api.delete(`/${dashboardId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
};