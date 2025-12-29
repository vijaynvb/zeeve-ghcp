import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const CORRELATION_HEADER = 'x-correlation-id';

/**
 * Ensures each request carries a correlation identifier for traceability.
 */
export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const correlationId = req.header(CORRELATION_HEADER) ?? uuidv4();
  req.correlationId = correlationId;
  res.setHeader(CORRELATION_HEADER, correlationId);
  next();
};
