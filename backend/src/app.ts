import cors from 'cors';
import express, { type Request } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import { env } from './config/env';
import { correlationIdMiddleware } from './middlewares/correlationId';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { logger } from './utils/logger';

const app = express();

const allowedOrigins = env.clientOrigin.split(',').map((origin) => origin.trim());

const requestLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(correlationIdMiddleware);
app.use(pinoHttp({
  logger,
  genReqId: (req) => (req as Request).correlationId,
  customProps: (req) => ({
    correlationId: req.correlationId
  })
}));
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(requestLimiter);

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', correlationId: req.correlationId });
});

app.use('/api', routes);
app.use(errorHandler);

export default app;
