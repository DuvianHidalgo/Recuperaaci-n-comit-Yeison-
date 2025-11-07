import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Productos() {
  const [productos, setProductos] = useLocalStorage('productos', []);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const manejarImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setNuevoProducto({ ...nuevoProducto, imagen: lector.result });
      };
      lector.readAsDataURL(archivo);
    }
  };

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
      stock: parseInt(nuevoProducto.stock) || 0,
      imagen: nuevoProducto.imagen || null
    };

    setProductos([...productos, producto]);
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProductos(productos.filter((p) => p.id !== id));
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
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
              required
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock"
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
              className="p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />

            {/* Campo para subir imagen */}
            <div className="col-span-2">
              <label className="text-white block mb-2">Imagen del producto (opcional):</label>
              <input
                type="file"
                accept="image/*"
                onChange={manejarImagen}
                className="block w-full text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none"
              />
              {nuevoProducto.imagen && (
                <img
                  src={nuevoProducto.imagen}
                  alt="Vista previa"
                  className="mt-3 h-32 object-cover rounded"
                />
              )}
            </div>
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
        {productos.map((producto) => (
          <div key={producto.id} className="bg-gray-800 p-4 rounded-lg">
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
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
