import { useState } from "react";
import axios from "axios";

function Formulario() {
    const [formData, setFormData] = useState({
    email: "",
    tutor1_name: "",
    tutor1_dni: "",
    tutor1_email: "",
    tutor1_phone: "",
    tutor2_name: "",
    tutor2_dni: "",
    tutor2_email: "",
    tutor2_phone: "",
    child1_name: "",
    child1_fechaNacimiento: "",
    child1_dni: "",
    child1_neae: "",
    child2_name: "",
    child2_fechaNacimiento: "",
    child2_dni: "",
    child2_neae: "",
    child3_name: "",
    child3_fechaNacimiento: "",
    child3_dni: "",
    child3_neae: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // URL del backend desde variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Convertir "" a null en opcionales
      const dataToSend = { ...formData };
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === "") {
          dataToSend[key] = null;
        }
      });
      
      console.log(dataToSend)
      await axios.post(`${API_URL}/inscriptions`, dataToSend);
      setMessage({ type: "success", text: "✅ Inscripción enviada correctamente." });

      setTimeout(() => setMessage(null), 4000);

      // reset form
      setFormData({
        email: "",
        tutor1_name: "",
        tutor1_dni: "",
        tutor1_email: "",
        tutor1_phone: "",
        tutor2_name: "",
        tutor2_dni: "",
        tutor2_email: "",
        tutor2_phone: "",
        child1_name: "",
        child1_fechaNacimiento: "",
        child1_dni: "",
        child1_neae: "",
        child2_name: "",
        child2_fechaNacimiento: "",
        child2_dni: "",
        child2_neae: "",
        child3_name: "",
        child3_fechaNacimiento: "",
        child3_dni: "",
        child3_neae: "",
        comments: "",
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setMessage({
          type: "error",
          text: error.response.data.errors.join(" | ")
        });
      } else {
        setMessage({
          type: "error",
          text: "❌ Error al enviar la inscripción. Inténtelo de nuevo."
        });
      }
      setTimeout(() => setMessage(null), 7000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-[#2F4B9E] mb-6 text-center">
          Formulario de Inscripción
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ---------------- Email principal ---------------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-[#2F4B9E] focus:ring-[#2F4B9E] p-2 bg-white"
            />
          </div>

          {/* ---------------- Tutor Legal 1 ---------------- */}
          <h2 className="text-lg font-semibold text-[#2F4B9E] mt-6 mb-2">
            Tutor Legal 1
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre y Apellidos *"
              name="tutor1_name"
              value={formData.tutor1_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="text"
              placeholder="DNI *"
              name="tutor1_dni"
              value={formData.tutor1_dni}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="email"
              placeholder="Email *"
              name="tutor1_email"
              value={formData.tutor1_email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="tel"
              placeholder="Teléfono *"
              name="tutor1_phone"
              value={formData.tutor1_phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
          </div>

          {/* ---------------- Tutor Legal 2 (opcional) ---------------- */}
          <h2 className="text-lg font-semibold text-[#2F4B9E] mt-6 mb-2">
            Tutor Legal 2 (opcional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre y Apellidos"
              name="tutor2_name"
              value={formData.tutor2_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="text"
              placeholder="DNI"
              name="tutor2_dni"
              value={formData.tutor2_dni}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="email"
              placeholder="Email"
              name="tutor2_email"
              value={formData.tutor2_email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              name="tutor2_phone"
              value={formData.tutor2_phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
          </div>

          {/* ---------------- Hij@s ---------------- */}
          <div className="bg-[#E0E7FF] p-6 rounded-xl mt-4 space-y-6">
            {["1", "2", "3"].map((i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-[#2F4B9E] mb-2">
                  Hij@ {i}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    name={`child${i}_name`}
                    value={formData[`child${i}_name`]}
                    onChange={handleChange}
                    required={i === "1"}
                    className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
                  />
                  <input
                    type="date"
                    name={`child${i}_fechaNacimiento`}
                    value={formData[`child${i}_fechaNacimiento`]}
                    onChange={handleChange}
                    required={i === "1"}
                    className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
                  />
                  <input
                    type="text"
                    placeholder="DNI"
                    name={`child${i}_dni`}
                    value={formData[`child${i}_dni`]}
                    onChange={handleChange}
                    required={i === "1"}
                    className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
                  />
                </div>
                <textarea
                  placeholder="¿Tiene alguna NEAE? Especifique..."
                  name={`child${i}_neae`}
                  value={formData[`child${i}_neae`]}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
                />
              </div>
            ))}
          </div>

          {/* ---------------- Comentarios ---------------- */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              ¿Desea comentar algún dato de interés?
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]"
            />
          </div>

          {/* ---------------- Botón y mensaje ---------------- */}
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-xl shadow text-white transition font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2563EB] hover:bg-[#1E40AF]"
              }`}
            >
              {loading ? "Enviando..." : "Enviar Inscripción"}
            </button>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center w-full max-w-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-[#C72C0E] bg-opacity-20 text-[#C72C0E]"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </form>
    </div>
  )
}

export default Formulario