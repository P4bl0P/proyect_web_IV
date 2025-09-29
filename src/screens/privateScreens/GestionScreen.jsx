// src/screens/GestionScreen.jsx
import { useNavigate } from "react-router-dom";
import { Building2, FileText, Wallet } from "lucide-react";
import NavBar from "../../components/NavBar"

export default function GestionScreen() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Jefatura",
      icon: <Building2 size={48} />,
      path: "/jefatura",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
      title: "Secretaría",
      icon: <FileText size={48} />,
      path: "/secretaria",
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      title: "Tesorería",
      icon: <Wallet size={48} />,
      path: "/tesoreria",
      color: "bg-red-100 text-red-700 hover:bg-red-200",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => navigate(section.path)}
            className={`flex flex-col items-center justify-center rounded-2xl shadow-md p-10 transition-transform transform hover:-translate-y-2 hover:shadow-2xl group ${section.color}`}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform">
              {section.icon}
            </div>
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}
