import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { AppError } from '../utils/appError';

interface JwtPayload {
  sub: string;
}

/**
 * Validates the bearer token and attaches the authenticated user identifier to the request.
 */
export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;

  if (!header) {
    throw new AppError('Authorization header is missing', 401);
  }

  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Invalid authorization header format', 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    if (!decoded.sub) {
      throw new AppError('Invalid token payload', 401);
    }

    req.userId = decoded.sub;
    next();
  } catch (error) {
    throw new AppError('Unauthorized', 401);
  }
};
