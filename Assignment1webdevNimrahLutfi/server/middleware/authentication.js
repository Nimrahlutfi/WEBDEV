//authnetciation middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticationMiddleware (req, res, next) {
  const token = req.header('Authorization');
//const token = token0.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {authenticationMiddleware};