// Entry point: load env vars, boot the Express app, and start listening.
require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/v1`);
});
