import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1.80/api/devices',
  timeout: 10000,
});

export const getDevices = async (jwtToken) => {
  const response = await api.get('/', {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const createDevice = async (jwtToken, deviceData) => {
  const response = await api.post('/', deviceData, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const deleteDevice = async (jwtToken, deviceId) => {
  const response = await api.delete(`/${deviceId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};

export const getDeviceDetails = async (jwtToken, deviceId) => {
  const response = await api.get(`/${deviceId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  return response.data;
};