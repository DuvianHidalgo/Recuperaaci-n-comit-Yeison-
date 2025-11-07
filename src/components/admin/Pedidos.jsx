import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Pedidos() {
  const [pedidos] = useLocalStorage('pedidos', []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Pedidos Realizados</h2>
      
      {pedidos.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-xl">No hay pedidos registrados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">Pedido #{pedido.id}</h4>
                  <p className="text-gray-400">Cliente: {pedido.clienteNombre}</p>
                  <p className="text-gray-400">Fecha: {pedido.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">${pedido.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h5 className="text-white font-bold mb-2">Productos:</h5>
                <div className="space-y-1">
                  {pedido.productos.map((prod, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{prod.nombre} x {prod.cantidad}</span>
                      <span>${(prod.precio * prod.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}