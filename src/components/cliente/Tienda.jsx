import { ShoppingCart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Tienda() {
  const [productos] = useLocalStorage('productos', []);
  const [carrito, setCarrito] = useLocalStorage('carrito', []);

  // Agrego un producto al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    
    if (existe) {
      // Si ya existe, aumento la cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si no existe, lo agrego con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    
    alert('Producto agregado al carrito');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Productos Disponibles</h2>
      
      {productos.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-xl">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos.map(producto => (
            <div key={producto.id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition">
              <h4 className="text-xl font-bold text-white mb-2">{producto.nombre}</h4>
              <p className="text-gray-400 mb-2">{producto.descripcion}</p>
              <p className="text-green-400 font-bold text-2xl mb-2">${producto.precio.toFixed(2)}</p>
              <p className="text-gray-400 mb-4">Disponibles: {producto.stock}</p>
              <button
                onClick={() => agregarAlCarrito(producto)}
                disabled={producto.stock === 0}
                className={`w-full px-4 py-3 rounded transition flex items-center justify-center space-x-2 font-semibold ${
                  producto.stock === 0
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <ShoppingCart size={20} />
                <span>{producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}