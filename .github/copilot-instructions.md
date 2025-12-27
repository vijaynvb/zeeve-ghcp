# Globacl coding & Architecture guidelines

## Clean Code Rules
- Use meaningfull names (camelCase for variables and functions, PascalCase for classes and types).
- keep functions small and focused on a single task.
- Avoid deep nesting by using early returns.

## Logging
- Use structured logging (e.g., JSON format) for better parsing and analysis.
- Every API request must include corelation IDs for traceability.

## Documentation
- All public functions must incluse doc comments.
- comments must be short, clear and written in English.

## Commit message Format
Follow Conventional Commits specification:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- refactor: A code change that neither fixes a bug nor adds a feature