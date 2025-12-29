import { useCallback, useEffect, useMemo, useState } from 'react';

import { AuthCard } from './components/AuthCard';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useAuth } from './hooks/useAuth';
import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  listTasks as listTasksRequest,
  updateTask as updateTaskRequest
} from './services/taskService';
import type { CreateTaskInput, UpdateTaskInput } from './services/taskService';
import type { Task, TaskStatus } from './types';
import { extractErrorMessage } from './utils/error';

const FILTER_OPTIONS: Array<{ label: string; value: TaskStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' }
];

/**
 * Entry point for the Todo dashboard handling authentication flow and task management.
 */
const App = (): JSX.Element => {
  const { user, isLoading: isAuthLoading, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const loadTasks = useCallback(async (filter: TaskStatus | 'all') => {
    setFetching(true);
    setListError(null);

    try {
      const result = await listTasksRequest(filter === 'all' ? undefined : filter);
      setTasks(result);
    } catch (error) {
      setListError(extractErrorMessage(error));
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    void loadTasks(statusFilter);
  }, [user, statusFilter, loadTasks]);

  const handleCreateTask = useCallback(async (payload: CreateTaskInput) => {
    const task = await createTaskRequest(payload);

    setTasks((current) => {
      if (statusFilter !== 'all' && statusFilter !== task.status) {
        return current;
      }

      return [task, ...current];
    });
  }, [statusFilter]);

  const handleUpdateTask = useCallback(async (taskId: string, payload: UpdateTaskInput) => {
    const task = await updateTaskRequest(taskId, payload);

    setTasks((current) => {
      if (statusFilter !== 'all' && statusFilter !== task.status) {
        return current.filter((item) => item._id !== task._id);
      }

      const exists = current.some((item) => item._id === task._id);
      if (!exists) {
        return [task, ...current];
      }

      return current.map((item) => (item._id === task._id ? task : item));
    });
  }, [statusFilter]);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    await deleteTaskRequest(taskId);

    setTasks((current) => current.filter((item) => item._id !== taskId));
  }, []);

  const heading = useMemo(() => (
    user ? `Welcome, ${user.email}` : 'Todo Manager'
  ), [user]);

  if (isAuthLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" aria-hidden="true" />
        <p className="mt-3">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5" style={{ maxWidth: 420 }}>
        <h1 className="text-center mb-4">{heading}</h1>
        <AuthCard />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">{heading}</h1>
          <p className="text-muted mb-0">Manage your tasks and stay productive.</p>
        </div>
        <button className="btn btn-outline-secondary" onClick={logout} type="button">
          Log out
        </button>
      </header>

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <TaskForm onCreate={handleCreateTask} />
        </div>
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Your Tasks</h2>
            <select
              className="form-select w-auto"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as TaskStatus | 'all')}
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {listError && (
            <div className="alert alert-danger" role="alert">
              {listError}
            </div>
          )}

          <TaskList
            tasks={tasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            isLoading={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
