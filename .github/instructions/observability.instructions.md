---
applyTo: "./observability/**"
description: "Observability best practices and guidelines"
---

# Observability Best Practices
## Logging
- use prometheus and grafana for logging and monitoring
- Ensure logs are structured (e.g., JSON format) for easier parsing and analysis.
- Include relevant context in log messages (e.g., request IDs, user IDs).
- Avoid logging sensitive information (e.g., passwords, personal data).
- Implement log rotation and retention policies to manage log storage.
- Use different log levels (e.g., DEBUG, INFO, WARN, ERROR) appropriately.