// Dashboard fetches profile data plus TODOs and displays them with light controls.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import {
  createTodo,
  deleteTodo,
  getProfile,
  listTodos,
  setAuthToken,
  updateProfile,
  updateTodo
} from '../services/api';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { accessToken, user, setSession } = useAuth();
  const [profile, setProfile] = useState(user);
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ status: '', tag: '' });
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [profileMessage, setProfileMessage] = useState('');

  const loadTodos = async (params = {}) => {
    setIsLoadingTodos(true);
    const response = await listTodos(params);
    setTodos(response.data);
    setIsLoadingTodos(false);
  };

  useEffect(() => {
    if (!accessToken) return;
    setAuthToken(accessToken);
    const fetchInitialData = async () => {
      const response = await getProfile();
      setProfile(response.data);
      setSession((prev) => ({ ...prev, user: response.data }));
      loadTodos({});
    };
    fetchInitialData();
  }, [accessToken, setSession]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    const { fullName, avatarUrl, timezone } = profile;
    const response = await updateProfile({ fullName, avatarUrl, timezone });
    setProfile(response.data);
    setSession((prev) => ({ ...prev, user: response.data }));
    setProfileMessage('Profile updated successfully!');
    setTimeout(() => setProfileMessage(''), 2500);
  };

  const handleCreateTodo = async (payload) => {
    await createTodo(payload);
    loadTodos(filters);
  };

  const handleStatusChange = async (id, status) => {
    await updateTodo(id, { status });
    loadTodos(filters);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos(filters);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterApply = (event) => {
    event.preventDefault();
    const params = {
      status: filters.status || undefined,
      tag: filters.tag || undefined
    };
    loadTodos(params);
  };

  if (!accessToken) {
    return <p className="text-center">Please log in to view your dashboard.</p>; // Fallback for edge cases.
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <form onSubmit={handleProfileSave}>
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input name="fullName" className="form-control" value={profile?.fullName || ''} onChange={handleProfileChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Avatar URL</label>
                  <input name="avatarUrl" className="form-control" value={profile?.avatarUrl || ''} onChange={handleProfileChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <input name="timezone" className="form-control" value={profile?.timezone || ''} onChange={handleProfileChange} />
                </div>
                <button className="btn btn-outline-primary" type="submit">Save profile</button>
                {profileMessage && <p className="text-success mt-2">{profileMessage}</p>}
                <p className="mt-3 mb-0 small text-muted">
                  Need a richer rolodex?{' '}
                  <Link to="/user-details" className="link-primary">
                    Open your user details workspace.
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Filters</h5>
              <form onSubmit={handleFilterApply}>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select name="status" className="form-select" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input name="tag" className="form-control" value={filters.tag} onChange={handleFilterChange} />
                </div>
                <button className="btn btn-secondary" type="submit">Apply filters</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <TodoForm onSubmit={handleCreateTodo} isSaving={isLoadingTodos} />
          {isLoadingTodos ? <p>Loading TODOs…</p> : (
            <TodoList todos={todos} onStatusChange={handleStatusChange} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
