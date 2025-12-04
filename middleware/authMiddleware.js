
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ msg: 'token manque' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'utilisateur nexiste pas' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'le token non valide' });
  }
};
