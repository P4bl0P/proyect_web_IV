import Navbar from "../components/NavBar";

const HomeScreen = () => {
  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}

      <Navbar />

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-start p-6 mt-6">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">¡Bienvenido a tu App!</h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Aquí puedes empezar a explorar todas las funcionalidades de tu aplicación.
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;