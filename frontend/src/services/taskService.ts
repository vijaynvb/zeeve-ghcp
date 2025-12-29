import apiClient from './apiClient';
import type { Task, TaskStatus } from '../types';

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string | null;
}

/**
 * Retrieves the tasks for the authenticated user.
 */
export const listTasks = async (status?: TaskStatus): Promise<Task[]> => {
  const { data } = await apiClient.get<{ tasks: Task[] }>('/tasks', {
    params: {
      status
    }
  });

  return data.tasks;
};

/**
 * Creates a new task owned by the authenticated user.
 */
export const createTask = async (payload: CreateTaskInput): Promise<Task> => {
  const { data } = await apiClient.post<{ task: Task }>('/tasks', payload);
  return data.task;
};

/**
 * Updates an existing task with the provided properties.
 */
export const updateTask = async (taskId: string, payload: UpdateTaskInput): Promise<Task> => {
  const { data } = await apiClient.put<{ task: Task }>(`/tasks/${taskId}`, payload);
  return data.task;
};

/**
 * Deletes a task by its identifier.
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  await apiClient.delete(`/tasks/${taskId}`);
};
