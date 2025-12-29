/**
 * Creates the shared application logger configured for structured JSON output.
 */
import pino from 'pino';

import { env } from '../config/env';

export const logger = pino({
  level: env.logLevel,
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime
});
