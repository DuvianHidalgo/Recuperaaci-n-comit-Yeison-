import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Productos() {
  // Uso mi hook personalizado para manejar productos en localStorage
  const [productos, setProductos] = useLocalStorage('productos', []);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });

  const agregarProducto = (e) => {
    e.preventDefault();
    
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      alert('Completa los campos requeridos');
      return;
    }

    const producto = {
      id: Date.now(),
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: parseFloat(nuevoProducto.precio),
      stock: parseInt(nuevoProducto.stock) || 0
    };

    setProductos([...productos, producto]);
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '' });
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Gestión de Productos</h2>
      
      {/* Formulario para agregar productos */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Agregar Nuevo Producto</h3>
        <form onSubmit={agregarProducto}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock"
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Agregar Producto
          </button>
        </form>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map(producto => (
          <div key={producto.id} className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-xl font-bold text-white mb-2">{producto.nombre}</h4>
            <p className="text-gray-400 mb-2">{producto.descripcion}</p>
            <p className="text-green-400 font-bold mb-2">${producto.precio.toFixed(2)}</p>
            <p className="text-gray-400 mb-4">Stock: {producto.stock}</p>
            <button
              onClick={() => eliminarProducto(producto.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-full flex items-center justify-center space-x-2"
            >
              <Trash2 size={18} />
              <span>Eliminar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}