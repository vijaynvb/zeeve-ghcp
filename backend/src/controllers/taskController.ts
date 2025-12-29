import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';
import { createTaskSchema, listTaskSchema, updateTaskSchema } from '../validators/taskValidators';

/**
 * Creates a new task for the authenticated user.
 */
export const createTaskHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const payload = createTaskSchema.parse(req.body);
    const task = await createTask(userId, {
      ...payload,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined
    });

    logger.info({ correlationId: req.correlationId, userId, taskId: task.id }, 'Task created');

    res.status(201).json({
      message: 'Task created',
      task,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns all tasks owned by the authenticated user.
 */
export const listTasksHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const filters = listTaskSchema.parse(req.query);
    const tasks = await getTasks(userId, filters.status);

    res.status(200).json({
      tasks,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates a task belonging to the authenticated user.
 */
export const updateTaskHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    const payload = updateTaskSchema.parse(req.body);
    const task = await updateTask(userId, req.params.taskId, {
      ...payload,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : payload.dueDate
    });

    logger.info({ correlationId: req.correlationId, userId, taskId: task.id }, 'Task updated');

    res.status(200).json({
      message: 'Task updated',
      task,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a task owned by the authenticated user.
 */
export const deleteTaskHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = ensureUser(req.userId);
    await deleteTask(userId, req.params.taskId);

    logger.info({ correlationId: req.correlationId, userId, taskId: req.params.taskId }, 'Task deleted');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const ensureUser = (userId?: string): string => {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  return userId;
};
