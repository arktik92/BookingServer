const { body } = require('express-validator');

const validateSignUp = [
        body('email').isEmail().withMessage('Doit être une adresse email valide'),
        body('password').isLength({ min: 6 }),
        body('role').isIn('user')
    ]

const ValidateSignIn = [
    body('email').isEmail().withMessage('Doit être une adresse email valide'),
    body('password').isLength({ min: 6 })
]

const validateEmail = [
    body('email').isEmail().withMessage('Doit être une adresse email valide')
]

module.exports = {
    validateSignUp,
    ValidateSignIn,
    validateEmail
}