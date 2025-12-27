---
applyTo: './frontend/**'
description: This file describes the React.js code style for the project.
---

# React.js Code Style Guidelines
## Component Structure
- Use functional components with hooks instead of class components.
- Keep components small and focused on a single responsibility.
- Organize components in a folder structure that reflects their hierarchy and purpose.
## TSX Syntax
- Use self-closing tags for components without children: `<Component />`
- Use PascalCase for component names.
- Use meaningful names for props and state variables.
## State Management
- Use the `useState` hook for local component state.
- Use the `useReducer` hook for complex state logic.
- For global state management, consider using Context API or state management libraries like Redux or Zustand.
## Props Handling
- Use PropTypes or TypeScript interfaces to define prop types.
- Destructure props in the function signature for clarity.
- Provide default values for props using default parameters or `defaultProps`.
## Event Handling
- Use camelCase for event handler names (e.g., `handleClick`).
- Pass event handlers as props to child components when necessary.
- Use `useCallback` to memoize event handlers when passing them to child components.
## Styling
- bootstrap css framework for styling
- Use CSS Modules, styled-components, or Emotion for component-level styling.
- Keep styles scoped to components to avoid global CSS conflicts.