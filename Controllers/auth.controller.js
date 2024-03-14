const authService = require('../services/AuthService');

const signIn = async (req, res, next) => {
    try {
        const token = await authService.signIn(req.body.email, req.body.password);
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    try {
        const user = await authService.signUp(req.body);
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

const sendEmailForResetPwd = async (req, res) => {
    try {
        await authService.sendEmailForResetPwd(req.body.email);
        res.send('Email envoyé');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const sendPassword = async (req, res, next) => {
    try {
        await authService.resetPassword(req.body.email, req.body.password);
        res.send('Mot de passe réinitialisé avec succès.');
    } catch (error) {
        next(error);
    }
}

const resetPassword = (req, res) => {
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
