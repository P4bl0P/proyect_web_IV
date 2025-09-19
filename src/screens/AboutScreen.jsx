import Navbar from "../components/NavBar";

const AboutScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 p-8">
      <Navbar />
      <h1 className="text-3xl font-bold">Conócenos</h1>
      <p className="mt-4 text-gray-700">
        Aquí puedes añadir información sobre tu grupo Scout.
      </p>
    </div>
  );
}

export default AboutScreen;
