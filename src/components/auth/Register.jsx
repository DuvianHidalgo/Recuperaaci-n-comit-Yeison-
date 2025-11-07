import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Register() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'cliente'
  });
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(datos);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={datos.nombre}
            onChange={(e) => setDatos({...datos, nombre: e.target.value})}
            required
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={datos.email}
            onChange={(e) => setDatos({...datos, email: e.target.value})}
            required
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={datos.password}
            onChange={(e) => setDatos({...datos, password: e.target.value})}
            required
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <select
            value={datos.tipo}
            onChange={(e) => setDatos({...datos, tipo: e.target.value})}
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition"
          >
            Registrarse
          </button>
          <Link
            to="/login"
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white p-3 rounded font-semibold transition text-center"
          >
            Volver al Login
          </Link>
        </form>
      </div>
    </div>
  );
}