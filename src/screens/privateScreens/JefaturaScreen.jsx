import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const JefaturaScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <NavBar />
      {/* Logo o encabezado */}
      <h1 className="text-3xl font-bold mb-4">Título de la pantalla de Jefatura</h1>
      
      {/* Mensaje o contenido */}
      <p className="text-gray-600 mb-6">Aquí va el contenido de tu pantalla vacía.</p>
      
      {/* Botón de ejemplo para navegación */}
      <Link
        to="/otra-ruta"
        className="px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition"
      >
        Ir a otra pantalla
      </Link>
    </div>
  );
};

export default JefaturaScreen;