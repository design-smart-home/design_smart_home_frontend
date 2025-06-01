import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1.80/api/widgets',
  timeout: 10000,
});

export const createWidget = async (jwtToken, widgetData) => {
  const response = await api.post('/', widgetData, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const getWidget = async (jwtToken, widgetId) => {
  const response = await api.get(`/${widgetId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const getDashboardWidgets = async (jwtToken, dashboardId) => {
  const response = await api.get(`/widgets_on_dashboard/${dashboardId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const updateWidget = async (jwtToken, widgetId, updateData) => {
  const response = await api.patch(`/${widgetId}`, updateData, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const deleteWidget = async (jwtToken, widgetId) => {
  const response = await api.delete(`/${widgetId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};