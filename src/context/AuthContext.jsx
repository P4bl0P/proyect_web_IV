import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as apiLogin, refreshAccessToken } from '../api/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [user, setUser] = useState(null);          // ✅ usuario logueado
  const [loading, setLoading] = useState(true);    // ✅ flag de carga inicial

  // Función para login
  const handleLogin = async (email, password) => {
    const tokens = await apiLogin(email, password);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    // Decodificar token para obtener usuario
    const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
    setUser({ id: payload.id, email: payload.email, role: payload.rol });
  };

  // Función para logout
  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('refreshToken');
  };

  // Inicializar usuario al montar el provider
  useEffect(() => {
    const initUser = async () => {
      if (refreshToken) {
        try {
          const tokens = await refreshAccessToken(refreshToken);
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);

          const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
          setUser({ id: payload.id, email: payload.email, role: payload.rol });

        } catch (error) {
          console.error("Error refrescando token", error);
          handleLogout();
        }
      }
      setLoading(false);
    };
    initUser();
  }, []);

  // Fetch con manejo automático de refresh token
  const fetchWithAuth = async (url, options = {}) => {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${accessToken}`;

    let res = await fetch(url, options);

    if (res.status === 401 && refreshToken) {
      try {
        const tokens = await refreshAccessToken(refreshToken);
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);

        const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
        setUser({ id: payload.id, email: payload.email, role: payload.role });

        options.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        res = await fetch(url, options);
      } catch (error) {
        console.error("Error refrescando token en fetchWithAuth", error);
        handleLogout();
      }
    }

    return res;
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, loading, handleLogin, handleLogout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
