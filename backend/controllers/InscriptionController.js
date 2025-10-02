import Inscription from '../models/Inscription.js';
import User from '../models/User.js';

const InscriptionController = {

  // Listar todas las inscripciones
  index: async (req, res) => {
    try {
      const inscriptions = await Inscription.findAll({
        order: [['createdAt', 'ASC']]
      });
      res.json(inscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inscripciones' });
    }
  },

  // Crear nueva inscripción
  create: async (req, res) => {
    console.log('req.body recibido:', req.body);
    try {
      const inscription = await Inscription.create(req.body);
      res.status(201).json(inscription);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        console.error('Error de validación:', err.errors.map(e => e.message));
        return res.status(400).json({ errors: err.errors.map(e => e.message) });
      }
      console.error('Error desconocido:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Aceptar inscripción
  accept: async (req, res) => {
    try {
      const { id } = req.params;
      const { hijo } = req.body; // 'child1' | 'child2' | 'child3'

      const inscripcion = await Inscription.findByPk(id);
      if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Datos del hijo
      const nombre = inscripcion[`${hijo}_name`];
      const fechaNacimiento = inscripcion[`${hijo}_fechaNacimiento`];
      const dni = inscripcion[`${hijo}_dni`];
      const neae = inscripcion[`${hijo}_neae`];

      if (!nombre) return res.status(400).json({ error: 'Ese hijo ya fue procesado' });

      if (!nombre || !fechaNacimiento || !dni) {
        return res.status(400).json({ error: `Datos incompletos para ${hijo}` });
      }

      console.log('Datos del hijo:', {
        nombre: inscripcion[`${hijo}_name`],
        fechaNacimiento: inscripcion[`${hijo}_fechaNacimiento`],
        dni: inscripcion[`${hijo}_dni`],
        neae: inscripcion[`${hijo}_neae`],
        tutor1_name: inscripcion.tutor1_name,
        tutor1_email: inscripcion.tutor1_email,
        tutor1_dni: inscripcion.tutor1_dni,
        tutor1_phone: inscripcion.tutor1_phone
      });
      
      // Crear User (censado)
      const nuevoUser = await User.create({
        nombre,
        fechaNacimiento,
        dni,
        neae,

        // datos progenitores
        progenitor1: inscripcion.tutor1_name,
        dniP1: inscripcion.tutor1_dni,
        emailP1: inscripcion.tutor1_email,
        telefonoP1: inscripcion.tutor1_phone,

        progenitor2: inscripcion.tutor2_name,
        dniP2: inscripcion.tutor2_dni,
        emailP2: inscripcion.tutor2_email,
        telefonoP2: inscripcion.tutor2_phone
      });

      // Vaciar campos del hijo aceptado en la inscripción
      await inscripcion.update({
        [`${hijo}_name`]: 'aceptado',
        [`${hijo}_fechaNacimiento`]: 'aceptado',
        [`${hijo}_dni`]: 'aceptado',
        [`${hijo}_neae`]: 'aceptado'
      });

      // Si no queda ningún hijo → actualizar estado
      const quedanHijos = [1, 2, 3].some(n => inscripcion[`child${n}_name`]);
      if (!quedanHijos) {
        inscripcion.status = 'aceptada';
        await inscripcion.save();
      }

      res.json({ message: 'Hijo aceptado', user: nuevoUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al aceptar hijo' });
    }
  },

  // Rechazar inscripción
  reject: async (req, res) => {
    try {
      const { id } = req.params;
      const { hijo } = req.body; // 'child1' | 'child2' | 'child3'

      const inscripcion = await Inscription.findByPk(id);
      if (!inscripcion) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Vaciar los campos de ese hijo
      await inscripcion.update({
        [`${hijo}_name`]: null,
        [`${hijo}_fechaNacimiento`]: null,
        [`${hijo}_dni`]: null,
        [`${hijo}_neae`]: null
      });

      // Si ya no quedan hijos → status = 'rechazada'
      const quedanHijos = [1, 2, 3].some(n => inscripcion[`child${n}_name`]);
      if (!quedanHijos) {
        inscripcion.status = 'rechazada';
        await inscripcion.save();
      }

      res.json({ message: 'Hijo rechazado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al rechazar hijo' });
    }
  },

  // Borrar inscripción
  delete: async (req, res) => {
    try {
      const inscription = await Inscription.findByPk(req.params.id);
      if (!inscription) return res.status(404).json({ error: 'Inscripción no encontrada' });

      await inscription.destroy();
      res.json({ message: 'Inscripción eliminada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

export default InscriptionController;
