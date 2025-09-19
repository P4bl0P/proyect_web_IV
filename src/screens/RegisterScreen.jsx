import { useState } from "react";

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellidos, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registro exitoso ✅");
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Error en el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">Registro</h1>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Registrarse</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
