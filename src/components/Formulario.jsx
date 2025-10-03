import { useState } from 'react';
import axios from 'axios';

function Formulario() {
  const [formData, setFormData] = useState({
    email: '',
    tutor1_name: '',
    tutor1_dni: '',
    tutor1_email: '',
    tutor1_phone: '',
    tutor2_name: '',
    tutor2_dni: '',
    tutor2_email: '',
    tutor2_phone: '',
    comments: '',
  });

  // Inicializamos con un hijo por defecto
  const [children, setChildren] = useState([
    { name: '', fechaNacimiento: '', dni: '', neae: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Cambios en campos de inscripción
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Cambios en los hijos
  const handleChildChange = (index, e) => {
    const newChildren = [...children];
    newChildren[index][e.target.name] = e.target.value;
    setChildren(newChildren);
  };

  // Añadir hijo
  const addChild = () => {
    setChildren([...children, { name: '', fechaNacimiento: '', dni: '', neae: '' }]);
  };

  // Eliminar hijo (solo desde el segundo)
  const removeChild = (index) => {
    if (index === 0) return; 
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Convertir '' a null en inscripción
      const dataToSend = { ...formData };
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === '') dataToSend[key] = null;
      });

      // Convertir '' a null en cada hijo
      const childrenToSend = children.map(c => {
        const newChild = { ...c };
        Object.keys(newChild).forEach(key => {
          if (newChild[key] === '') newChild[key] = null;
        });
        return newChild;
      });

      console.log({
        ...dataToSend,
        children: childrenToSend
      });
      
      // Enviar al backend
      await axios.post(`${API_URL}/inscriptions`, {
        ...dataToSend,
        children: childrenToSend
      });

      setMessage({ type: 'success', text: '✅ Inscripción enviada correctamente.' });

      setTimeout(() => setMessage(null), 4000);

      // reset form
      setFormData({
        email: '',
        tutor1_name: '',
        tutor1_dni: '',
        tutor1_email: '',
        tutor1_phone: '',
        tutor2_name: '',
        tutor2_dni: '',
        tutor2_email: '',
        tutor2_phone: '',
        comments: '',
      });
      setChildren([{ name: '', fechaNacimiento: '', dni: '', neae: '' }]);
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || '❌ Error al enviar la inscripción'
      });
      setTimeout(() => setMessage(null), 7000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border border-[#E02D2D] max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8'>
      <h1 className='text-3xl font-bold text-[#2F4B9E] mb-6 text-center'>
        Formulario de Inscripción
      </h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* ---------------- Email principal ---------------- */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email *
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-[#2F4B9E] focus:ring-[#2F4B9E] p-2 bg-white'
          />
        </div>

        {/* ---------------- Tutor 1 ---------------- */}
        <h2 className='text-lg font-semibold text-[#2F4B9E] mt-6 mb-2'>
          Tutor Legal 1
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input type='text' placeholder='Nombre y Apellidos *' name='tutor1_name' value={formData.tutor1_name} onChange={handleChange} required className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='text' placeholder='DNI *' name='tutor1_dni' value={formData.tutor1_dni} onChange={handleChange} required className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='email' placeholder='Email *' name='tutor1_email' value={formData.tutor1_email} onChange={handleChange} required className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='tel' placeholder='Teléfono *' name='tutor1_phone' value={formData.tutor1_phone} onChange={handleChange} required className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
        </div>

        {/* ---------------- Tutor 2 ---------------- */}
        <h2 className='text-lg font-semibold text-[#2F4B9E] mt-6 mb-2'>
          Tutor Legal 2 (opcional)
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input type='text' placeholder='Nombre y Apellidos' name='tutor2_name' value={formData.tutor2_name} onChange={handleChange} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='text' placeholder='DNI' name='tutor2_dni' value={formData.tutor2_dni} onChange={handleChange} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='email' placeholder='Email' name='tutor2_email' value={formData.tutor2_email} onChange={handleChange} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
          <input type='tel' placeholder='Teléfono' name='tutor2_phone' value={formData.tutor2_phone} onChange={handleChange} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
        </div>

        {/* ---------------- Hijos ---------------- */}
        <div className='bg-[#E0E7FF] p-6 rounded-xl mt-4 space-y-6'>
          {children.map((child, index) => (
            <div key={index}>
              <h2 className='text-lg font-semibold text-[#2F4B9E] mb-2'>
                Hij@ {index + 1}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input type='text' placeholder='Nombre' name='name' value={child.name} onChange={(e) => handleChildChange(index, e)} required={index === 0} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
                <input type='date' name='fechaNacimiento' value={child.fechaNacimiento} onChange={(e) => handleChildChange(index, e)} required={index === 0} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
                <input type='text' placeholder='DNI' name='dni' value={child.dni} onChange={(e) => handleChildChange(index, e)} required={index === 0} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
              </div>
              <textarea placeholder='¿Tiene alguna NEAE? Especifique...' name='neae' value={child.neae} onChange={(e) => handleChildChange(index, e)} className='mt-2 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
              
              {index > 0 && (
                <button type='button' onClick={() => removeChild(index)} className='mt-2 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                  Eliminar hijo
                </button>
              )}
            </div>
          ))}

          <button type='button' onClick={addChild} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
            Añadir otro hijo
          </button>
        </div>

        {/* ---------------- Comentarios ---------------- */}
        <div className='mt-6'>
          <label className='block text-sm font-medium text-gray-700'>
            ¿Desea comentar algún dato de interés?
          </label>
          <textarea name='comments' value={formData.comments} onChange={handleChange} className='mt-1 block w-full rounded-xl border border-gray-300 p-2 bg-white focus:border-[#2F4B9E] focus:ring-[#2F4B9E]' />
        </div>

        {/* ---------------- Botón y mensaje ---------------- */}
        <div className='flex flex-col items-center mt-6'>
          <button type='submit' disabled={loading} className={`px-6 py-2 rounded-xl shadow text-white transition-transform duration-200 font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E02D2D] hover:bg-[#B42323]'}`}>
            {loading ? 'Enviando...' : 'Enviar Inscripción'}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center w-full max-w-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-[#C72C0E] bg-opacity-20 text-[#C72C0E]'}`}>
              {message.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Formulario;
