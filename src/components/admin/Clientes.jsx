import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Clientes() {
  const [clientes, setClientes] = useLocalStorage('clientes', []);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    documento: '',
    direccion: '',
    telefono: ''
  });

  const agregarCliente = (e) => {
    e.preventDefault();
    
    if (!nuevoCliente.nombre || !nuevoCliente.documento) {
      alert('Completa los campos requeridos');
      return;
    }

    const cliente = {
      id: Date.now(),
      ...nuevoCliente
    };

    setClientes([...clientes, cliente]);
    setNuevoCliente({ nombre: '', documento: '', direccion: '', telefono: '' });
  };

  const eliminarCliente = (id) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Gestión de Clientes</h2>
      
      {/* Formulario para agregar clientes */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo Cliente</h3>
        <form onSubmit={agregarCliente}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Documento"
              value={nuevoCliente.documento}
              onChange={(e) => setNuevoCliente({...nuevoCliente, documento: e.target.value})}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={nuevoCliente.direccion}
              onChange={(e) => setNuevoCliente({...nuevoCliente, direccion: e.target.value})}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={nuevoCliente.telefono}
              onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Agregar Cliente
          </button>
        </form>
      </div>

      {/* Tabla de clientes */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left text-white">Nombre</th>
              <th className="p-4 text-left text-white">Documento</th>
              <th className="p-4 text-left text-white">Dirección</th>
              <th className="p-4 text-left text-white">Teléfono</th>
              <th className="p-4 text-left text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id} className="border-t border-gray-700">
                <td className="p-4 text-white">{cliente.nombre}</td>
                <td className="p-4 text-white">{cliente.documento}</td>
                <td className="p-4 text-white">{cliente.direccion}</td>
                <td className="p-4 text-white">{cliente.telefono}</td>
                <td className="p-4">
                  <button
                    onClick={() => eliminarCliente(cliente.id)}
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