export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}
