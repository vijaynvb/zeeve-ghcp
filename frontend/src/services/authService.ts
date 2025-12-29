import apiClient from './apiClient';
import type { User } from '../types';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Logs the user into the application using the provided credentials.
 */
export const login = async (payload: AuthPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
};

/**
 * Registers a new account and returns the created session token.
 */
export const register = async (payload: AuthPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  return data;
};
