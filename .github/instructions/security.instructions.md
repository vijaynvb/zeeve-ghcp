---
applyTo: "**"
description: "Security and architectural safeguards"
---

# Security Guidelines

## Input Safety
- Always validate input.
- Never trust client-provided data.

## Secrets
- Never hardcode credentials or tokens.
- Encourage use of environment variables or secrets manager.
<!-- - secrets are maintained in hashicorp vault 
- cors configured to allow only trusted origins
- RBAC implemented for sensitive operations
- Use HTTPS for all communications Self signed certificates are not allowed
- Regularly rotate secrets and credentials.
- Use strong encryption for sensitive data at rest and in transit.
- Implement multi-factor authentication (MFA) where applicable. -->

## API Contracts
- Follow OpenAPI standards.
- Ensure backward compatibility.

## Unsafe Patterns (Do NOT generate)
- eval()
- Inline SQL with dynamic string concatenation
- Logging sensitive data
- PII details in error messages
- Outdated or vulnerable libraries

# Architectural Safeguards
## Layered Architecture
- Separate concerns into distinct layers (e.g., presentation, business logic, data access).
- Ensure each layer only interacts with adjacent layers.
## Microservices Principles
- Design services to be independently deployable and scalable.
- Use API gateways for routing and security.
- Implement service discovery mechanisms.
