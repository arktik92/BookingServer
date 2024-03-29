
const jwt = require('jsonwebtoken');

const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Accès refusé, Vous n\'avez pas le rôle Admin');
    }
};

module.exports = { checkAdminRole }