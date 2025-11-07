import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Navbar } from '../components/layout/Navbar';
import { Usuarios } from '../components/admin/Usuarios';
import { Productos } from '../components/admin/Productos';
import { Clientes } from '../components/admin/Clientes';
import { Pedidos } from '../components/admin/Pedidos';
import { Tienda } from '../components/cliente/Tienda';
import { Carrito } from '../components/cliente/Carrito';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { useAuth } from '../context/AuthContext';

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Muestro el navbar solo si el usuario está autenticado */}
      {isAuthenticated && <Navbar />}
      
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas para ADMIN */}
        <Route path="/admin/usuarios" element={
          <AdminRoute>
            <Usuarios />
          </AdminRoute>
        } />
        <Route path="/admin/productos" element={
          <AdminRoute>
            <Productos />
          </AdminRoute>
        } />
        <Route path="/admin/clientes" element={
          <AdminRoute>
            <Clientes />
          </AdminRoute>
        } />
        <Route path="/admin/pedidos" element={
          <AdminRoute>
            <Pedidos />
          </AdminRoute>
        } />
        
        {/* Rutas protegidas para CLIENTES */}
        <Route path="/tienda" element={
          <PrivateRoute>
            <Tienda />
          </PrivateRoute>
        } />
        <Route path="/carrito" element={
          <PrivateRoute>
            <Carrito />
          </PrivateRoute>
        } />
        
        {/* Ruta por defecto - redirijo al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}