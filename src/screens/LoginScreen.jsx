import { useState, useContext } from "react";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token); // 🔑 Guardamos token en el contexto
        setMessage("Login correcto ✅");
        navigate("/gestion"); // 🔄 Redirigir a la pantalla de gestión
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Error en el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <form
        onSubmit={handleLogin}
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
