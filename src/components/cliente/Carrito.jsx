import { Plus, Minus, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuth } from '../../context/AuthContext';

export function Carrito() {
  const [carrito, setCarrito] = useLocalStorage('carrito', []);
  const [pedidos, setPedidos] = useLocalStorage('pedidos', []);
  const { user } = useAuth();

  // Calculo el total del carrito
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const aumentarCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const disminuirCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ));
  };

  const eliminarDelCarrito = (id) => {
    if (window.confirm('¿Eliminar este producto del carrito?')) {
      setCarrito(carrito.filter(item => item.id !== id));
    }
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Creo el pedido con toda la información
    const nuevoPedido = {
      id: Date.now(),
      clienteId: user.id,
      clienteNombre: user.nombre,
      productos: carrito,
      total: total,
      fecha: new Date().toLocaleString('es-ES')
    };

    setPedidos([...pedidos, nuevoPedido]);
    setCarrito([]);
    alert('¡Pedido realizado exitosamente!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Mi Carrito</h2>
      
      {carrito.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-xl">Tu carrito está vacío</p>
          <p className="text-gray-500 mt-2">¡Agrega productos desde la tienda!</p>
        </div>
      ) : (
        <>
          {/* Lista de productos en el carrito */}
          <div className="space-y-4 mb-6">
            {carrito.map(item => (
              <div key={item.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">{item.nombre}</h4>
                  <p className="text-gray-400">${item.precio.toFixed(2)} c/u</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-bold text-xl min-w-12 text-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => aumentarCantidad(item.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition"
                  >
                    <Plus size={18} />
                  </button>
                  <span className="text-green-400 font-bold min-w-24 text-right">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen y botón de compra */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-white">Total:</span>
              <span className="text-3xl font-bold text-green-400">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={finalizarCompra}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-xl transition"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}