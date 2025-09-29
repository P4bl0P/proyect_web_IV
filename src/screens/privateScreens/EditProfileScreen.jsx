import Navbar from "../../components/NavBar";

const EditProfileScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 p-8">
      <Navbar />
      <h1 className="text-3xl font-bold">Este es tu perfil</h1>
      <p className="mt-4 text-gray-700">
        Perfil.
      </p>
    </div>
  );
}

export default EditProfileScreen;