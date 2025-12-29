import { NextFunction, Request, Response } from 'express';

import { authenticateUser, registerUser } from '../services/authService';
import { logger } from '../utils/logger';
import { loginSchema, registerSchema } from '../validators/authValidators';

/**
 * Handles user registration and returns an authentication token alongside the profile.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await registerUser(payload.email, payload.password);
    const session = await authenticateUser(payload.email, payload.password);

    logger.info({ correlationId: req.correlationId, userId: String(session.user._id) }, 'User registered');

    res.status(201).json({
      message: 'Registration successful',
      token: session.token,
      user: session.user,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticates the user credentials and issues a JWT token.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = loginSchema.parse(req.body);
    const session = await authenticateUser(payload.email, payload.password);

    logger.info({ correlationId: req.correlationId, userId: String(session.user._id) }, 'User logged in');

    res.status(200).json({
      message: 'Login successful',
      token: session.token,
      user: session.user,
      correlationId: req.correlationId
    });
  } catch (error) {
    next(error);
  }
};
