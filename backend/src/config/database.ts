import mongoose from 'mongoose';

import { env } from './env';
import { logger } from '../utils/logger';

/**
 * Establishes a resilient MongoDB connection using the configured URI.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error({ error }, 'MongoDB connection failed');
    process.exit(1);
  }
};
