import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Usuarios() {
  const { usuarios, eliminarUsuario } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Gestión de Usuarios</h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left text-white">Nombre</th>
              <th className="p-4 text-left text-white">Email</th>
              <th className="p-4 text-left text-white">Tipo</th>
              <th className="p-4 text-left text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id} className="border-t border-gray-700">
                <td className="p-4 text-white">{usuario.nombre}</td>
                <td className="p-4 text-white">{usuario.email}</td>
                <td className="p-4 text-white">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    usuario.tipo === 'admin' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {usuario.tipo}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      if (window.confirm('¿Eliminar este usuario?')) {
                        eliminarUsuario(usuario.id);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}