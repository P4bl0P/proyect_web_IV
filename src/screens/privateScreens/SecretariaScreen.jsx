import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import { ChevronDown, ChevronUp } from "lucide-react"; // para iconos bonitos

export default function SecretariaScreen() {
  const { fetchWithAuth } = useAuth();
  const [inscriptions, setInscriptions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/inscriptions`);
      if (!res.ok) throw new Error("Error al cargar inscripciones");
      const data = await res.json();
      // ordenar por fecha (más antiguas primero)
      const sorted = data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setInscriptions(sorted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const handleChildAction = async (childId, action) => {
    try {
      const url = `${API_URL}/children/${childId}/${action}`;
      const res = await fetchWithAuth(url, { method: "PUT" });
      if (!res.ok) throw new Error(`Error al ${action} hijo`);
      fetchInscriptions();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p className="p-4">Cargando inscripciones...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6">📋 Inscripciones</h1>

      {inscriptions.length === 0 ? (
        <p className="text-gray-500">No hay inscripciones todavía.</p>
      ) : (
        <div className="space-y-4">
          {inscriptions.map((insc) => (
            <div
              key={insc.inscriptionId}
              className="border rounded-xl shadow-sm overflow-hidden"
            >
              {/* Cabecera de inscripción */}
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
                onClick={() =>
                  setExpanded(expanded === insc.inscriptionId ? null : insc.inscriptionId)
                }
              >
                <div className="text-left">
                  <p className="font-semibold">
                    Tutor 1: {insc.tutor1_name} ({insc.tutor1_email})
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(insc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {expanded === insc.inscriptionId ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Contenido desplegable */}
              {expanded === insc.inscriptionId && (
                <div className="p-4 space-y-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">👨‍👩‍👧 Tutores</h3>
                      <p><strong>Tutor 1:</strong> {insc.tutor1_name} ({insc.tutor1_email}) - {insc.tutor1_phone}</p>
                      {insc.tutor2_name && (
                        <p><strong>Tutor 2:</strong> {insc.tutor2_name} ({insc.tutor2_email}) - {insc.tutor2_phone}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">📝 Comentarios</h3>
                      <p className="text-gray-700">
                        {insc.comments || "Sin comentarios"}
                      </p>
                    </div>
                  </div>

                  {/* Hijos */}
                  <div>
                    <h3 className="font-semibold mb-2">👦 Hijos</h3>
                    {insc.children && insc.children.length > 0 ? (
                      <ul className="space-y-2">
                        {insc.children.map((child) => (
                          <li
                            key={child.childId}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
                          >
                            <div>
                              <p className="font-medium">{child.name}</p>
                              <p className="text-sm text-gray-600">
                                Nacido el: {child.fechaNacimiento} · Rama:{" "}
                                <span className="italic">{child.rama}</span>
                              </p>
                              <p className="text-sm">
                                Estado:{" "}
                                <span
                                  className={`font-semibold ${
                                    child.status === "Pendiente"
                                      ? "text-yellow-600"
                                      : child.status === "Aceptado"
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {child.status}
                                </span>
                              </p>
                            </div>
                            <div className="space-x-2">
                              <button
                                className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded"
                                onClick={() =>
                                  handleChildAction(child.childId, "aceptar")
                                }
                              >
                                Aceptar
                              </button>
                              <button
                                className="px-3 py-1 bg-red-200 hover:bg-red-300 rounded"
                                onClick={() =>
                                  handleChildAction(child.childId, "rechazar")
                                }
                              >
                                Rechazar
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No hay hijos asociados.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
