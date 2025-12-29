import { Types } from 'mongoose';

import { Task, TaskDocument, TaskStatus } from '../models/Task';
import { assertCategoryOwnership } from './categoryService';
import { AppError } from '../utils/appError';

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date;
  categoryId?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date | null;
  categoryId?: string | null;
}

/**
 * Stores a new task bound to the authenticated user.
 */
export const createTask = async (userId: string, payload: CreateTaskInput): Promise<TaskDocument> => {
  if (payload.categoryId) {
    await assertCategoryOwnership(userId, payload.categoryId);
  }

  const task = await Task.create({
    user: userId,
    title: payload.title,
    description: payload.description,
    status: payload.status,
    dueDate: payload.dueDate,
    category: payload.categoryId
  });

  return task;
};

/**
 * Retrieves tasks owned by the user with optional status filtering.
 */
export const getTasks = async (userId: string, status?: TaskStatus): Promise<TaskDocument[]> => {
  const query: Record<string, unknown> = { user: userId };

  if (status) {
    query.status = status;
  }

  return Task.find(query).sort({ createdAt: -1 }).lean();
};

/**
 * Updates a task owned by the user and returns the latest persisted state.
 */
export const updateTask = async (
  userId: string,
  taskId: string,
  payload: UpdateTaskInput
): Promise<TaskDocument> => {
  validateObjectId(taskId);

  const sanitizedPayload = { ...payload };

  if (sanitizedPayload.dueDate === null) {
    sanitizedPayload.dueDate = undefined;
  }

  if (typeof sanitizedPayload.categoryId !== 'undefined' && sanitizedPayload.categoryId !== null) {
    await assertCategoryOwnership(userId, sanitizedPayload.categoryId);
  }

  const updatePayload: Record<string, unknown> = { ...sanitizedPayload };

  if (typeof sanitizedPayload.categoryId !== 'undefined') {
    updatePayload.category = sanitizedPayload.categoryId ?? undefined;
    delete updatePayload.categoryId;
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updatePayload,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  return task;
};

/**
 * Removes a task belonging to the user.
 */
export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  validateObjectId(taskId);

  const result = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!result) {
    throw new AppError('Task not found', 404);
  }
};

const validateObjectId = (value: string): void => {
  if (!Types.ObjectId.isValid(value)) {
    throw new AppError('Invalid identifier', 400);
  }
};
