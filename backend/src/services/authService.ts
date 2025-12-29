import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { User } from '../models/User';
import { AppError } from '../utils/appError';

const SALT_ROUNDS = 12;
const TOKEN_TTL = '1d';

/**
 * Registers a new user with a hashed password and returns the persisted document.
 */
export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ email, passwordHash });

  return user.toJSON();
};

/**
 * Validates user credentials and returns the authentication token alongside the user profile.
 */
export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+passwordHash');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({}, env.jwtSecret, {
    expiresIn: TOKEN_TTL,
    subject: user.id
  });

  const { passwordHash: _passwordHash, ...rest } = user.toObject();

  return {
    token,
    user: rest
  };
};
