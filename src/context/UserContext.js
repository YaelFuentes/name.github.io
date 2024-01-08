// AuthProvider.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  const saveSession = async (userData, userEmail) => {
    setUser(userData);
    setEmail(userEmail);

    try {
      const response = await axios.post('/api/auth', {
        username: userData.user,
        password: 'dummy-password',
      });

      if (response.status === 200) {
        console.log('Sesión guardada en el servidor');
      } else {
        console.error('Error al guardar la sesión en el servidor');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud a /api/auth', error);
    }
  };

  const logout = async () => {
    setUser(null);
    setEmail(null);
    // Puedes agregar aquí la lógica para cerrar sesión en el servidor si es necesario
  };

  return (
    <AuthContext.Provider value={{ user, email, saveSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
