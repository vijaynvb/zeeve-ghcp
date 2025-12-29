import app from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

/**
 * Bootstraps the HTTP server after establishing the database connection.
 */
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      logger.info({ port: env.port }, 'Server ready');
    });
  } catch (error) {
    logger.error({ error }, 'Server start failed');
    process.exit(1);
  }
};

startServer();
