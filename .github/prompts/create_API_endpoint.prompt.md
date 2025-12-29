---
agent: 'ask'
description: This prompt is used to create a new REST API endpoint for a microservice following best practices.
model: GPT-5-Codex (Preview) (copilot)
---

Create a new REST API endpoint for a microservice for the given input.  
- Use domain-driven design: define a controller, service, repository layers.  
- Request & response JSON should follow our naming conventions (camelCase).  
- Validate input data, apply error handling.  
- Add basic route documentation stub (OpenAPI / Swagger style).  
- Add unit-test skeleton for service layer.