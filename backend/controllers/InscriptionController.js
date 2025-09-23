import Inscription from '../models/Inscription.js';
import User from '../models/User.js';

const InscriptionController = {

  // Listar todas las inscripciones
  index: async (req, res) => {
    try {
      const inscriptions = await Inscription.findAll();
      res.json(inscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear nueva inscripción
  create: async (req, res) => {
    console.log("req.body recibido:", req.body);
    try {
      const inscription = await Inscription.create(req.body);
      res.status(201).json(inscription);
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        console.error("Error de validación:", err.errors.map(e => e.message));
        return res.status(400).json({ errors: err.errors.map(e => e.message) });
      }
      console.error("Error desconocido:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Aceptar inscripción
  accept: async (req, res) => {
    try {
      const inscription = await Inscription.findByPk(req.params.id);
      if (!inscription) return res.status(404).json({ error: 'Inscripción no encontrada' });

      // Crear usuario a partir de la inscripción
      await User.create({
        nombre: inscription.child1_name,
        fechaNacimiento: inscription.child1_fechaNacimiento,
        dni: inscription.child1_dni,
        neae: inscription.child1_neae,
        progenitor1: inscription.tutor1_name,
        dniP1: inscription.tutor1_dni,
        emailP1: inscription.tutor1_email,
        telefonoP1: inscription.tutor1_phone,
        progenitor2: inscription.tutor2_name,
        dniP2: inscription.tutor2_dni,
        emailP2: inscription.tutor2_email,
        telefonoP2: inscription.tutor2_phone
      });

      if (inscription.child2_name != null) {
        await User.create({
          nombre: inscription.child2_name,
          fechaNacimiento: inscription.child2_fechaNacimiento,
          dni: inscription.child2_dni,
          neae: inscription.child2_neae,
          progenitor1: inscription.tutor1_name,
          dniP1: inscription.tutor1_dni,
          emailP1: inscription.tutor1_email,
          telefonoP1: inscription.tutor1_phone,
          progenitor2: inscription.tutor2_name,
          dniP2: inscription.tutor2_dni,
          emailP2: inscription.tutor2_email,
          telefonoP2: inscription.tutor2_phone
        });
      }

      if (inscription.child3_name != null) {
        await User.create({
          nombre: inscription.child3_name,
          fechaNacimiento: inscription.child3_fechaNacimiento,
          dni: inscription.child3_dni,
          neae: inscription.child3_neae,
          progenitor1: inscription.tutor1_name,
          dniP1: inscription.tutor1_dni,
          emailP1: inscription.tutor1_email,
          telefonoP1: inscription.tutor1_phone,
          progenitor2: inscription.tutor2_name,
          dniP2: inscription.tutor2_dni,
          emailP2: inscription.tutor2_email,
          telefonoP2: inscription.tutor2_phone
        })
      }

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
