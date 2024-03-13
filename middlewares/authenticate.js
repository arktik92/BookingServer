
const jwt = require('jsonwebtoken');

// MARK: - Check if user has the admin role
const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Accès refusé, Vous n\'avez pas le rôle Admin');
    }
};

const verifyJWT = (req, res, next) => {
    const SECRET_KEY = process.env.SECRET_KEY; // A remplacer par la même clé secrète que dans la route signin
    const token = req.header("Authorization");
  
  
    if (!token)
      return res.status(401).json({ auth: false, message: "No token provided." });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
      next(); // Si le token est valide, on passe à la suite
    } catch (e) {
      res.status(400).json({ auth: false, message: "Invalid token." });
    }
  };

module.exports = { checkAdminRole, verifyJWT }