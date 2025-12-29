import { useState } from 'react';

import type { UpdateTaskInput } from '../services/taskService';
import type { Task, TaskStatus } from '../types';
import { extractErrorMessage } from '../utils/error';

const STATUS_OPTIONS: TaskStatus[] = ['pending', 'in_progress', 'completed'];

interface TaskListProps {
  tasks: Task[];
  onUpdate: (taskId: string, payload: UpdateTaskInput) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Displays the user's tasks and exposes quick actions for updates.
 */
export const TaskList = ({ tasks, onUpdate, onDelete, isLoading }: TaskListProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    setActiveTaskId(taskId);
    setError(null);

    try {
      await onUpdate(taskId, { status });
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    setActiveTaskId(taskId);
    setError(null);

    try {
      await onDelete(taskId);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setActiveTaskId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" aria-hidden="true" />
        <p className="mt-3">Loading tasks...</p>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="text-center text-muted py-5">
        <p>No tasks yet. Start by creating one above.</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="list-group">
        {tasks.map((task) => (
        <div key={task._id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h3 className="h5 mb-1">{task.title}</h3>
              {task.description && <p className="mb-2">{task.description}</p>}
              <div className="small text-muted">
                <span className="me-3">Status: {task.status.replace(/_/g, ' ')}</span>
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>
            </div>
            <div className="d-flex flex-column align-items-end gap-2">
              <select
                className="form-select form-select-sm"
                value={task.status}
                onChange={(event) => handleStatusChange(task._id, event.target.value as TaskStatus)}
                disabled={activeTaskId === task._id}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(task._id)}
                type="button"
                disabled={activeTaskId === task._id}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};
