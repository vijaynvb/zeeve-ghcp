---
applyTo: './backend/**'
description: "Express.js best practices and coding standards"
---

# Express.js Best Practices
## Project Structure
- Organize your project into clear directories: `routes`, `controllers`, `models`, `middlewares`, and `utils`.
- Keep your `app.js` or `server.js` file clean by offloading logic to controllers and services. 

## Middleware Usage 
- Use middleware for common tasks like logging, authentication, and error handling.
- Always place error-handling middleware at the end of the middleware stack.
- Use built-in middleware like `express.json()` and `express.urlencoded()` for parsing request bodies.
## Routing
- Define routes in separate files and use Express Router to modularize them.
- Use RESTful conventions for route naming (e.g., `GET /users`, `POST /users`).
## Error Handling
- Implement centralized error handling middleware to catch and respond to errors consistently.
- Use appropriate HTTP status codes for different types of responses (e.g., 200 for success
, 404 for not found, 500 for server errors).
## Security
- Sanitize user inputs to prevent injection attacks.
- Use Helmet.js to set secure HTTP headers.
- Implement rate limiting to protect against DDoS attacks.
- Always validate and sanitize data before processing.
## Performance
- Use compression middleware to reduce response sizes.
- Implement caching strategies where appropriate.
- Optimize database queries to reduce latency.
## Logging
- Use a logging library like Winston or Morgan for structured logging.
- Log important events, errors, and request details for debugging and monitoring.
## Testing
- Write unit tests for controllers, services, and middleware.
- Use integration tests to verify the behavior of routes and middleware.
- Consider using testing frameworks like Mocha, Chai, or Jest.
## Documentation
- Document your API endpoints using tools like Swagger.
- Maintain clear and concise README files for your project.
## Code Style
- Follow consistent coding conventions (e.g., use ESLint with a shared configuration).
- Use async/await for handling asynchronous operations instead of callbacks or promises directly.
- Keep functions small and focused on a single task.
- Use descriptive names for variables, functions, and classes.
- Avoid deep nesting by using early returns and modular functions.