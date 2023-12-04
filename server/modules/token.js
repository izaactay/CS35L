// jwt token verification TODO: move to separate module
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').split(' ').pop();
  if (!token) {
    console.log('Unauthorized - Token not provided');
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Forbidden - Invalid token');
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }
    // console.log(decoded)
    req.user = decoded.sub;
    next();
  });
};

module.exports = { authenticate }