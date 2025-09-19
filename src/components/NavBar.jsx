import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logoIV.jpeg";
import loginIcon from "../assets/flor_lis.png";

function NavButton({ text, to }) {
  return (
    <Link
      to={to}
      className="text-white hover:bg-indigo-500 px-4 py-2 rounded transition-colors"
    >
      {text}
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

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


const NavBar = () => {
  return (
    <nav className="w-full bg-[#1840C4] shadow-md fixed top-0 left-0 z-50 h-14 px-4">
      <div className="flex items-center justify-between h-full">
        {/* Logo + texto */}
        <div className="flex items-center">
          <img src={logo} alt="Logo Grupo IV" className="h-10 rounded-full object-cover" /> {/* logo más pequeño: 2.5rem ≈ 40px */}
          <span className="ml-2 text-white font-bold text-sm leading-none">
            Grupo IV Scout Montequinto
          </span>
        </div>

        {/* Botones de navegación */}
        <div className="flex space-x-4">
          <NavButton text="Inicio" to="/home" />
          <NavButton text="Conócenos" to="/about" />
          <NavButton text="Contacto" to="/contact" />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;