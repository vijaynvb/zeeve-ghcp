---
applyTo: '**/*.ts, **/*.tsx'
description: This file describes the TypeScript code style for the project.
---

# TypeScript Code Style Guidelines

## Naming Conventions
- Use `camelCase` for variable and function names.
- Use `PascalCase` for class, interface, and type names.
- Prefix private fields with an underscore (`_`).
- Use meaningful and descriptive names that convey the purpose of the variable or function.
## Formatting
- Use 2 spaces for indentation.
- Limit lines to a maximum of 100 characters.
- Use single quotes (`'`) for strings, except when the string contains a single quote.
- Always use semicolons at the end of statements.
- Place opening braces on the same line as the control statement or declaration.
## Type Annotations
- Always explicitly type function return values.
- Use union types and intersection types to create flexible and reusable types.
- Prefer `type` aliases for complex types and `interface` for object shapes.
## Functions
- Keep functions small and focused on a single task.
- Use arrow functions for anonymous functions.
- Avoid using `any` type; prefer more specific types.
## Classes and Interfaces
- Use `implements` to enforce interface contracts on classes.
- Use access modifiers (`public`, `private`, `protected`) to encapsulate class members appropriately.
- Prefer composition over inheritance where applicable.
## Modules and Imports
- Use ES6 module syntax (`import` and `export`).
- Group imports by external modules, internal modules, and relative imports.
- Avoid wildcard imports; import only what is necessary.
## Comments and Documentation
- Use JSDoc comments for public functions, classes, and interfaces.
- Write clear and concise comments that explain the "why" behind complex logic.
- Keep comments up to date with code changes.
## Error Handling
- Use `try-catch` blocks for handling exceptions in asynchronous code.
- Prefer throwing specific error types over generic errors.
- Always provide meaningful error messages.
## Testing
- Write unit tests for all public functions and methods.
- Use descriptive names for test cases that explain the expected behavior.
- Aim for high code coverage, but prioritize meaningful tests over coverage percentage.
## Asynchronous Programming
- Use `async`/`await` syntax for handling asynchronous operations.
- Avoid callback hell by using Promises or async/await.
- Handle errors in asynchronous code using `try-catch` blocks.
## Miscellaneous
- Use `const` for variables that are not reassigned and `let` for those that are.
- Avoid using global variables; encapsulate them within modules or classes.
- Regularly refactor code to improve readability and maintainability.