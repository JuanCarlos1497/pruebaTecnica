import axios from 'axios';
import { refreshToken } from './authService';
import { getTokens } from '../utils/tokenUtils';

const api = axios.create(); 

// Agregar access_token a cada request
api.interceptors.request.use(config => {
  const { access_token } = getTokens();
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

// Interceptor para manejar renovación automática
api.interceptors.response.use(
  res => res,
  async error => {
    if (
      error.response?.status === 401 ||
      error.response.statusText === 'unauthorized_token' &&
      !error.config._retry
    ) {
      console.log('Token expirado, intentando renovar...');
      error.config._retry = true;

      try {
        await refreshToken();
        const { access_token } = getTokens();
        error.config.headers.Authorization = `Bearer ${access_token}`;
        return api.request(error.config);
      } catch (e) {
        console.error('Falló la renovación del token', e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;