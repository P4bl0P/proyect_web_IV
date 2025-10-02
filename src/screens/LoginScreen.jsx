import { useState } from 'react';
import Navbar from '../components/NavBar';
import { useAuth } from '../context/AuthContext'; // ✅ Hook del Context
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const { handleLogin } = useAuth(); // usamos la función centralizada
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await handleLogin(email, password);
      setMessage("Login exitoso");
      navigate("/gestion");
    } catch (err) {
      console.error("Error en LoginScreen:", err);
      setMessage(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Navbar />
      <form
        onSubmit={onSubmit}
        className='bg-white p-6 rounded-lg shadow-lg w-96'
      >
        <h1 className='text-xl font-bold mb-4'>Iniciar Sesión</h1>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 mb-3 border rounded'
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 mb-3 border rounded'
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 ${message.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginScreen;
