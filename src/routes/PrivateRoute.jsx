import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que protege rutas - solo usuarios autenticados pueden acceder
export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, lo redirijo al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}