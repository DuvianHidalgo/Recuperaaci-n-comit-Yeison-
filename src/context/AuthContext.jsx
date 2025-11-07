import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Creo el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

// Provider que envuelve toda la app y provee el estado de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Cargo los usuarios y sesión guardada al iniciar
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    const sesionGuardada = localStorage.getItem('sesionActiva');

    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    }
    if (sesionGuardada) {
      setUser(JSON.parse(sesionGuardada));
    }
  }, []);

  // Guardo usuarios en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  // Función para registrar un nuevo usuario
  const register = (datos) => {
    if (usuarios.find(u => u.email === datos.email)) {
      alert('Este correo ya está registrado');
      return false;
    }

    const nuevoUsuario = {
      id: Date.now(),
      ...datos
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    alert('Usuario registrado exitosamente');
    navigate('/login');
    return true;
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
      setUser(usuario);
      localStorage.setItem('sesionActiva', JSON.stringify(usuario));
      
      // Redirijo según el tipo de usuario
      if (usuario.tipo === 'admin') {
        navigate('/admin/productos');
      } else {
        navigate('/tienda');
      }
      return true;
    } else {
      alert('Credenciales incorrectas');
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sesionActiva');
    navigate('/login');
  };

  // Función para eliminar usuarios (solo admin)
  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const value = {
    user,
    usuarios,
    register,
    login,
    logout,
    eliminarUsuario,
    isAuthenticated: !!user,
    isAdmin: user?.tipo === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}