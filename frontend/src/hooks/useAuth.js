// Tiny helper hook re-exports the context for ergonomic imports.
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => useAuthContext();
