const AuthService = require('../services/AuthService');
const validator = require('../middlewares/expressValidator');

const signIn = async (req, res, next) => {
    const authService = new AuthService(req.body.email, req.body.password);
    validator.hasError
    try {
        const token = await authService.signIn();
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    const authService = new AuthService(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phoneNumber);
    validator.hasError
    try {
        const user = await authService.signUp();
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

const sendEmailForResetPwd = async (req, res) => {
    const authService = new AuthService(req.body.email);
    validator.hasError
    try {
        await authService.sendEmailForResetPwd();
        res.send('Email envoyé');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const sendPassword = async (req, res, next) => {
    const authService = new AuthService(req.body.email, req.body.password);
    validator.hasError
    try {
        await authService.resetPassword();
        res.send('Mot de passe réinitialisé avec succès.');
    } catch (error) {
        next(error);
    }
}

const resetPassword = (req, res) => {
    validator.hasError
    const email = req.query.email;
    res.render('resetPassword', { email });
}

module.exports = {
    signIn,
    signUp,
    sendPassword, 
    sendEmailForResetPwd,
    resetPassword
};
