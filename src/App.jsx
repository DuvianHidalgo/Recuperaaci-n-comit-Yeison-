import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoute';

function App() {
  return (
    // Envuelvo toda la app con el AuthProvider para que todos los componentes tengan acceso al contexto
    <AuthProvider>
      <div className="min-h-screen bg-gray-900">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;