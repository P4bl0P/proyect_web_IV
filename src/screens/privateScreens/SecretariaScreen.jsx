import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";

export default function SecretariaScreen() {
  const { fetchWithAuth } = useAuth();
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Función para cargar inscripciones
  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`${API_URL}/inscriptions`);
      if (!res.ok) throw new Error("Error al cargar inscripciones");
      const data = await res.json();
      setInscriptions(Array.isArray(data) ? data : []);
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

  // Función para aceptar o rechazar hijo
  const handleChildAction = async (id, hijo, action) => {
    try {
      const url = `${API_URL}/inscriptions/${id}/${action}`;
      console.log("Enviar PUT a:", url, "con body:", { hijo });
      const res = await fetchWithAuth(`${API_URL}/inscriptions/${id}/${action}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hijo }),
      });
      if (!res.ok) {
        const errorJson = await res.json().catch(() => null);
        const msg = errorJson?.error || `Error al ${action} hijo`;
        throw new Error(msg);
      }
      fetchInscriptions(); // recargar datos
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando inscripciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <NavBar />
      <h1 className="text-2xl font-bold mb-4">Inscripciones</h1>
      {inscriptions.length === 0 ? (
        <p>No hay inscripciones.</p>
      ) : (
        <ul className="space-y-4">
          {inscriptions.map((insc) => (
            <li
              key={insc.id}
              className="p-4 border rounded shadow hover:bg-gray-50 transition"
            >
              <p>
                <strong>Tutor 1:</strong> {insc.tutor1_name} ({insc.tutor1_email})
              </p>
              <p>
                <strong>Tutor 2:</strong> {insc.tutor2_name} ({insc.tutor2_email})
              </p>
              <p>
                <strong>Estado:</strong> {insc.status}
              </p>
              <div className="mt-2 space-y-2">
                {[1, 2, 3].map((n) => {
                  const nombre = insc[`child${n}_name`];
                  if (!nombre) return null;
                  return (
                    <div
                      key={n}
                      className="flex justify-between items-center border-t pt-2"
                    >
                      <div>
                        <span className="font-semibold">{nombre}</span> -{" "}
                        {insc[`child${n}_fechaNacimiento`]}
                      </div>
                      <div className="space-x-2">
                        <button
                          className="px-2 py-1 bg-green-300 rounded hover:bg-green-400"
                          onClick={() =>
                            handleChildAction(insc.id, `child${n}`, "aceptar")
                          }
                        >
                          Aceptar
                        </button>
                        <button
                          className="px-2 py-1 bg-red-300 rounded hover:bg-red-400"
                          onClick={() =>
                            handleChildAction(insc.id, `child${n}`, "rechazar")
                          }
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
