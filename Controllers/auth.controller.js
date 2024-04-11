const AuthService = require('../services/AuthService');
const validator = require('../middlewares/expressValidator');

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const authService = new AuthService(email, password);
    validator.hasError
    try {
        const token = await authService.signIn();
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    const { email, password, firstname, lastname, phoneNumber } = req.body;
    const authService = new AuthService(email, password, firstname, lastname, phoneNumber);
    validator.hasError
    try {
        const user = await authService.signUp();
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

const sendEmailForResetPwd = async (req, res) => {
    const { email } = req.body;
    const authService = new AuthService(email);
    validator.hasError
    try {
        await authService.sendEmailForResetPwd();
        res.send('Email envoyé');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const sendPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const authService = new AuthService(email, password);
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
