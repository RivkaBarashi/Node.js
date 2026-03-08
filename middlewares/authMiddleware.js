
const jwt = require('jsonwebtoken');
const fs = require('fs');

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}


function logProductAction(action, product) {
  const logMessage = `${action} product: ${product.title} at ${new Date().toISOString()}\n`;
  fs.appendFileSync('product.log', logMessage);
}

module.exports = { authenticate, authorize, logProductAction };