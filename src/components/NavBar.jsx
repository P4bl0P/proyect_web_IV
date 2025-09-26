import { useState, useContext } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logoIV.jpeg";
import loginIcon from "../assets/flor_lis.png";
import { AuthContext } from "../context/AuthContext";

/* COMPONENTES AUXILIARES */

function NavButton({ text, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-white hover:bg-indigo-500 px-4 py-2 rounded transition-colors"
    >
      {text}
    </Link>
  );
}

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

function LogoButton() {
  return (
    <Link to="/home">
      <img
        src={logo}
        alt="Logo Grupo IV"
        className="h-10 rounded-full object-cover ml-2"
      />
    </Link>
  );
}

function LoginButton() {
  return (
    <Link to="/login">
      <img
        src={loginIcon}
        alt="Login"
        className="h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
      />
    </Link>
  );
}

/* MENÚ DE GESTIÓN */
function GestionMenu() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
      >
        Gestión
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
          <Link
            to="/gestion"
            className="block px-4 py-2 hover:bg-gray-200"
            onClick={() => setOpen(false)}
          >
            Ir a gestión
          </Link>
          <Link 
            to="/editProfile"
            className="block px-4 py-2 hover:bg-gray-200"
            onClick={() => setOpen(false)}
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

/* NAVBAR PRINCIPAL */
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1840C4] shadow-md">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Hamburguesa + Logo */}
        <div className="flex items-center">
          <div className="md:hidden -ml-4 z-50">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              duration={0.4}
              color="#fff"
            />
          </div>

          <LogoButton />
          <span className="ml-4 text-white font-bold text-sm leading-none">
            Grupo IV Scout Montequinto
          </span>
        </div>

        {/* Menú escritorio */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavButton text="Inicio" to="/home" />
          <NavButton text="Conócenos" to="/about" />
          <NavButton text="Contacto" to="/contact" />
          {isLoggedIn ? <GestionMenu /> : <LoginButton />}
        </div>
      </div>

      {/* Fondo oscuro al abrir drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer móvil */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1840C4] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="flex justify-end py-[12px] pr-4">
          {isLoggedIn ? <GestionMenu /> : <LoginButton />}
        </div>

        <div className="flex flex-col px-4 py-4 mt-4 space-y-2 ">
          <NavButton text="Inicio" to="/home" onClick={() => setIsOpen(false)} />
          <NavButton text="Conócenos" to="/about" onClick={() => setIsOpen(false)} />
          <NavButton text="Contacto" to="/contact" onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
