

export const validateChildData = (req, res, next) => {
  const { name, fechaNacimiento, dni, inscriptionId } = req.body;
  if (!name || !fechaNacimiento || !dni || !inscriptionId) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  next();
};

export const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next();
};