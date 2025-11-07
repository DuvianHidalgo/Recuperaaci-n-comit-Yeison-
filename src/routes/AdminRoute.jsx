import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que protege rutas de admin - solo administradores pueden acceder
export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  // Si no está autenticado, lo mando al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no es admin, lo mando a la tienda
  if (!isAdmin) {
    return <Navigate to="/tienda" replace />;
  }

  return children;
}