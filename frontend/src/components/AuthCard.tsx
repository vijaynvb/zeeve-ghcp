import { FormEvent, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { extractErrorMessage } from '../utils/error';

type FormMode = 'login' | 'register';

/**
 * Renders the authentication form allowing users to log in or register.
 */
export const AuthCard = (): JSX.Element => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<FormMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = { email, password };

      if (mode === 'login') {
        await login(payload);
      } else {
        await register(payload);
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((current) => (current === 'login' ? 'register' : 'login'));
    setError(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title h4 text-center mb-3">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Register'}
            </button>
            <button
              className="btn btn-link"
              type="button"
              onClick={toggleMode}
              disabled={isSubmitting}
            >
              {mode === 'login' ? 'Need an account? Register' : 'Have an account? Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
