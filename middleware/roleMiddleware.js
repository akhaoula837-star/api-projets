
module.exports = (requiredRole) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Connexion requise' });
  if (req.user.role !== requiredRole) return res.status(403).json({ msg: 'vous navez pas la permission' });
  next();
};//w hedha chiverifi role mta3 luser
