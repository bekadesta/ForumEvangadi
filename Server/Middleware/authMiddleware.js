const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'No token provided, authorization denied' });
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = { username, userid };
    
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
