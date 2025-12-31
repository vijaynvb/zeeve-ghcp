// App component wires up the router, navbar, and protected routes.
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import UserDetailsPage from './pages/UserDetailsPage';
import { useAuth } from './hooks/useAuth';
import { setAuthToken } from './services/api';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, accessToken } = useAuth();
  useEffect(() => {
    if (accessToken) {
      setAuthToken(accessToken);
    }
  }, [accessToken]);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <div>
    <AppNavbar />
    <main className="container py-4">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-details"
          element={(
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </main>
  </div>
);

export default App;
