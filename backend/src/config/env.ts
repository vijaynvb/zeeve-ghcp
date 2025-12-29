import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('4000'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  CLIENT_ORIGIN: z.string().min(1, 'CLIENT_ORIGIN is required'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  LOG_LEVEL: z.string().default('info')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

const config = parsedEnv.data;

export const env = {
  port: Number(config.PORT),
  mongoUri: config.MONGODB_URI,
  jwtSecret: config.JWT_SECRET,
  clientOrigin: config.CLIENT_ORIGIN,
  rateLimitWindowMs: Number(config.RATE_LIMIT_WINDOW_MS),
  rateLimitMaxRequests: Number(config.RATE_LIMIT_MAX_REQUESTS),
  logLevel: config.LOG_LEVEL
};
