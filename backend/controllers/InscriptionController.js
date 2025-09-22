import Inscription from '../models/Inscription.js';
import User from '../models/User.js';

const InscriptionController = {

  // Crear nueva inscripción
  create: async (req, res) => {
    try {
      const inscription = await Inscription.create(req.body);
      res.status(201).json(inscription);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Aceptar inscripción
  accept: async (req, res) => {
    try {
      const inscription = await Inscription.findByPk(req.params.id);
      if (!inscription) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Crear usuario a partir de la inscripción
      await User.create({
        nombre: inscription.nombre,
        fechaNacimiento: inscription.child1_fechaNacimiento,
        dni: inscription.tutorDNI,
        password: '123456' // puedes generar aleatoria
      });

      inscription.estado = 'aceptada';
      await inscription.save();

      res.json({ message: 'Inscripción aceptada', inscription });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Rechazar inscripción
  reject: async (req, res) => {
    try {
      const inscription = await Inscription.findByPk(req.params.id);
      if (!inscription) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Eliminar de la BD
      await inscription.destroy();

      res.json({ message: 'Inscripción rechazada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
