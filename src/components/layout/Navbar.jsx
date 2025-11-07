import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, Users, Package, ClipboardList, LogOut } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {isAdmin ? (
            <>
              <Link
                to="/admin/usuarios"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <Users size={20} />
                <span>Usuarios</span>
              </Link>
              <Link
                to="/admin/productos"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <Package size={20} />
                <span>Productos</span>
              </Link>
              <Link
                to="/admin/clientes"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <Users size={20} />
                <span>Clientes</span>
              </Link>
              <Link
                to="/admin/pedidos"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <ClipboardList size={20} />
                <span>Pedidos</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/tienda"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <Package size={20} />
                <span>Tienda</span>
              </Link>
              <Link
                to="/carrito"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
              >
                <ShoppingCart size={20} />
                <span>Carrito</span>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Hola, {user?.nombre}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            <LogOut size={20} />
            <span>Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}