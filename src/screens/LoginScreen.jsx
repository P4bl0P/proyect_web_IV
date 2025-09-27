import { useState } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext"; // ✅ Hook del Context
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { handleLogin } = useAuth(); // usamos la función centralizada
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password); // se encarga de login + guardar tokens
      setMessage("Login exitoso");
      navigate("/gestion"); // redirige a la pantalla de gestión
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error de login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default LoginScreen;
