// Centralized configuration helpers keep magic numbers in one place.
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const ACCESS_TOKEN_TTL_SECONDS = parseInt(process.env.ACCESS_TOKEN_TTL_SECONDS || '900', 10); // 15 minutes
const REFRESH_TOKEN_TTL_HOURS = parseInt(process.env.REFRESH_TOKEN_TTL_HOURS || '168', 10); // 7 days

module.exports = {
  PORT,
  JWT_SECRET,
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_HOURS
};
