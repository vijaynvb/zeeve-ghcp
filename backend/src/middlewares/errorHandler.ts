import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '../utils/appError';
import { logger } from '../utils/logger';

/**
 * Centralized API error handler that logs the failure while returning safe responses.
 */
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let details: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    details = err.errors.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }));
  }

  logger.error({
    err,
    correlationId: req.correlationId
  }, 'Request failed');

  res.status(statusCode).json({
    message,
    correlationId: req.correlationId,
    ...(details ? { details } : {})
  });
};
