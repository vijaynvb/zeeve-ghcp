// Auth page allows toggling between registration and login without leaving the screen.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, setAuthToken } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', fullName: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const payload = mode === 'register' ? { ...form } : { email: form.email, password: form.password };
      const response = mode === 'register'
        ? await registerUser(payload)
        : await loginUser(payload);
      setSession(response.data);
      setAuthToken(response.data.accessToken);
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError?.response?.data?.message || 'Unable to authenticate');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-3">{mode === 'register' ? 'Create an account' : 'Welcome back'}</h4>
            <p className="text-muted mb-4">Use your email and password to sign {mode === 'register' ? 'up' : 'in'}.</p>
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input name="fullName" className="form-control" value={form.fullName} onChange={handleChange} required />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required minLength={8} />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button className="btn btn-primary w-100" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Submitting…' : mode === 'register' ? 'Register' : 'Log in'}
              </button>
            </form>
            <hr className="my-4" />
            <p className="text-center">
              {mode === 'register' ? 'Already have an account?' : "Need an account?"}
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setMode((prev) => (prev === 'login' ? 'register' : 'login'))}
              >
                {mode === 'register' ? 'Log in instead' : 'Register now'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
