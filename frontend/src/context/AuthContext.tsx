import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { setAuthToken } from '../services/apiClient';
import { login as loginRequest, register as registerRequest } from '../services/authService';
import type { AuthPayload, AuthResponse } from '../services/authService';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (payload: AuthPayload) => Promise<AuthResponse>;
  register: (payload: AuthPayload) => Promise<AuthResponse>;
  logout: () => void;
}

const TOKEN_STORAGE_KEY = 'todo_token';
const USER_STORAGE_KEY = 'todo_user';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Provides authentication state and helpers to all child components.
 */
export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true
  });

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setAuthToken(storedToken);
        setState({
          user: parsedUser,
          token: storedToken,
          isLoading: false
        });
        return;
      } catch (error) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }

    setAuthToken(null);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const persistSession = useCallback((session: AuthResponse) => {
    setAuthToken(session.token);
    localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
    setState({
      user: session.user,
      token: session.token,
      isLoading: false
    });
  }, []);

  const login = useCallback(async (payload: AuthPayload) => {
    const session = await loginRequest(payload);
    persistSession(session);
    return session;
  }, [persistSession]);

  const register = useCallback(async (payload: AuthPayload) => {
    const session = await registerRequest(payload);
    persistSession(session);
    return session;
  }, [persistSession]);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    login,
    register,
    logout
  }), [login, register, logout, state]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
