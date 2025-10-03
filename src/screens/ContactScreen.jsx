import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';


function InscriptionButton() {
  return (
    <Link
      to='/inscription'
      className='
        inline-block 
        px-14 py-6 
        bg-[#D41717] 
        text-white 
        rounded-xl 
        font-bold 
        text-2xl 
        transition-colors 
        duration-300 
        hover:bg-[#e64545]
      '
    >
      Inscripción
    </Link>
  );
}

const ContactScreen = () => {
  return (
    <div className='min-h-screen bg-gray-50 pt-16 p-8'>
      <Navbar />
      <h1 className='text-3xl font-bold mb-13'>Contacto</h1>
      <p className='mt-4 text-gray-700 mb-20'>
        Aquí puedes añadir la información de contacto de tu grupo.
      </p>
      <InscriptionButton />
    </div>
  );
}

export default ContactScreen;