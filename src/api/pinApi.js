import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: 'http://128.0.0.80', // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ API АДРЕС
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Интерсептор для авторизации
api.interceptors.request.use(config => {
  const { jwtToken } = useAuth();
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const pinApi = {
  /**
   * Создает новый пин устройства
   * @param {object} pinData - Данные для создания пина
   * @param {string} pinData.name - Название пина
   * @param {string} pinData.type - Тип пина (digital/analog)
   * @param {string} pinData.direction - Направление (input/output)
   * @returns {Promise<object>} - Созданный пин
   */
  async createPin(pinData) {
    try {
      const response = await api.post('/pins/', pinData);
      return response.data;
    } catch (error) {
      console.error('Pin creation error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create pin');
    }
  },

  /**
   * Получает пин по ID
   * @param {string} pinId - UUID пина
   * @returns {Promise<object>} - Данные пина
   */
  async getPin(pinId) {
    try {
      const response = await api.get(`/pins/${pinId}`);
      return response.data;
    } catch (error) {
      console.error('Pin fetch error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch pin');
    }
  },

  /**
   * Получает все пины для указанного устройства
   * @param {string} deviceId - UUID устройства
   * @returns {Promise<array>} - Массив пинов
   */
  async getAllDevicePins(deviceId) {
    try {
      const response = await api.get(`/pins/all_pins/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error('Device pins fetch error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch device pins');
    }
  },

  /**
   * Обновляет пин
   * @param {string} pinId - UUID пина
   * @param {object} updateData - Данные для обновления
   * @returns {Promise<object>} - Обновленный пин
   */
  async updatePin(pinId, updateData) {
    try {
      const response = await api.patch(`/pins/${pinId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Pin update error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update pin');
    }
  },

  /**
   * Удаляет пин
   * @param {string} pinId - UUID пина
   * @returns {Promise<object>} - Результат удаления
   */
  async deletePin(pinId) {
    try {
      const response = await api.delete(`/pins/${pinId}`);
      return response.data;
    } catch (error) {
      console.error('Pin deletion error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete pin');
    }
  }
};

export default pinApi;