// React context keeps auth state reachable from any component without prop drilling.
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

const buildInitialState = () => {
  try {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : { accessToken: null, refreshToken: null, user: null };
  } catch (error) {
    console.warn('Unable to parse auth state', error);
    return { accessToken: null, refreshToken: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(buildInitialState);

  const updateAuthState = useCallback((nextValue) => {
    setAuthState((prev) => {
      const value = typeof nextValue === 'function' ? nextValue(prev) : nextValue;
      localStorage.setItem('auth', JSON.stringify(value));
      return value;
    });
  }, [setAuthState]);

  const logout = useCallback(() => {
    setAuthToken(null);
    updateAuthState({ accessToken: null, refreshToken: null, user: null });
  }, [updateAuthState]);

  const value = useMemo(() => ({
    ...authState,
    isAuthenticated: Boolean(authState.accessToken),
    setSession: updateAuthState,
    logout
  }), [authState, logout, updateAuthState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
