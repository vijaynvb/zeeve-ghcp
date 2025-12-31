// Express application wiring lives here to keep index.js lean and testable.
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const todoRoutes = require('./routes/todos.routes');
const userDetailRoutes = require('./routes/userDetails.routes');
const errorHandler = require('./middleware/errorHandler');
const { swaggerDocument, swaggerUiOptions } = require('./docs/swagger');

const app = express();

// Core middleware adds JSON parsing, logging, and relaxed CORS for the React client.
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// A simple readiness probe helps local debugging.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the published OpenAPI document and Swagger UI explorer.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
app.get('/docs.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(swaggerDocument);
});

// Namespacing with /v1 matches the OpenAPI servers block.
app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/todos', todoRoutes);
app.use('/v1/user-details', userDetailRoutes);

// Fallback for any unknown route keeps responses predictable.
app.use((req, res) => {
  res.status(404).json({ code: 'NOT_FOUND', message: 'Route not found' });
});

// Centralized error handler runs last.
app.use(errorHandler);

module.exports = app;
