import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  timeout: 10000
});

let bearerToken: string | null = null;

/**
 * Updates the authorization token injected in each request.
 */
export const setAuthToken = (token: string | null): void => {
  bearerToken = token;
};

apiClient.interceptors.request.use((config) => {
  const correlationId = generateCorrelationId();
  config.headers.set('x-correlation-id', correlationId);
  config.headers.set('Accept', 'application/json');

  if (bearerToken) {
    config.headers.set('Authorization', `Bearer ${bearerToken}`);
  }

  return config;
});

const generateCorrelationId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default apiClient;
