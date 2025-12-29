import { FormEvent, useState } from 'react';

import type { CreateTaskInput } from '../services/taskService';
import type { TaskStatus } from '../types';
import { extractErrorMessage } from '../utils/error';

const STATUS_OPTIONS: TaskStatus[] = ['pending', 'in_progress', 'completed'];

interface TaskFormProps {
  onCreate: (payload: CreateTaskInput) => Promise<void>;
}

/**
 * Captures the information required to create a new task.
 */
export const TaskForm = ({ onCreate }: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined
      });
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="taskTitle" className="form-label">Title</label>
              <input
                id="taskTitle"
                className="form-control"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={200}
              />
            </div>
            <div className="col-12">
              <label htmlFor="taskDescription" className="form-label">Description</label>
              <textarea
                id="taskDescription"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                maxLength={1000}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="taskStatus" className="form-label">Status</label>
              <select
                id="taskStatus"
                className="form-select"
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="taskDueDate" className="form-label">Due date</label>
              <input
                id="taskDueDate"
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <div className="d-grid d-sm-flex justify-content-sm-end mt-3">
            <button
              className="btn btn-success"
              type="submit"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
