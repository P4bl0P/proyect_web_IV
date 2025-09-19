import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logoIV.jpeg";
import loginIcon from "../assets/flor_lis.png";

/* ===================== */
/* COMPONENTES INDIVIDUALES */
/* ===================== */

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

function LoginButton({ onClick }) {
  return (
    <Link to="/login" onClick={onClick}>
      <img 
        src={loginIcon} 
        alt="Login" 
        className="h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
      />
    </Link>
  );
}

/* ===================== */
/* NAVBAR PRINCIPAL */
/* ===================== */

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1840C4] shadow-md">
      {/* Contenedor principal */}
      <div className="flex items-center justify-between h-14 px-4">
        {/* Hamburguesa + Logo */}
        <div className="flex items-center">
          {/* Botón hamburguesa animado */}
          <div className="md:hidden -ml-4 z-50">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              duration={0.4}
              color="#fff"
            />
          </div>

          {/* Logo y texto */}
          <img src={logo} alt="Logo Grupo IV" className="h-10 rounded-full object-cover ml-2" />
          <span className="ml-4 text-white font-bold text-sm leading-none">
            Grupo IV Scout Montequinto
          </span>
        </div>

        {/* Menú escritorio */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavButton text="Inicio" to="/home" />
          <NavButton text="Conócenos" to="/about" />
          <NavButton text="Contacto" to="/contact" />
          <LoginButton />
        </div>
      </div>

      {/* Fondo oscuro al abrir drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer móvil desde la izquierda */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1840C4] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        {/* Enlaces */}
        <div className="flex flex-col space-y-2 px-4 py-4 mt-4">
          <NavButton text="Inicio" to="/home" onClick={() => setIsOpen(false)} />
          <NavButton text="Conócenos" to="/about" onClick={() => setIsOpen(false)} />
          <NavButton text="Contacto" to="/contact" onClick={() => setIsOpen(false)} />
          <LoginButton onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
