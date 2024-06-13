const { body, validationResult } = require('express-validator');

const hasError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        next();
    }
}

// MARK: - AUTH VALIDATION
const signUpValidationRules = () => {
    return [
        body('firstname').exists().withMessage('Ne peut pas être vide').not().isEmpty().withMessage('Ne peut pas être vide'),
        body('lastname').exists().not().isEmpty().withMessage('Ne peut pas être vide'),
        body('email').exists().withMessage('Ne peut pas être vide').not().isEmpty().withMessage("Ne peut pas être vide").isEmail().withMessage('Doit être une adresse email valide'),
        body('password').exists().isLength({ min: 6 }),
        body('phoneNumber').exists().not().isEmpty().withMessage('Ne peut pas être vide'),
        body('phoneNumber').isLength({ min: 10, max: 10 }).withMessage('Doit être un numéro de téléphone valide'),
        body('phoneNumber').isMobilePhone().withMessage('Doit être un numéro de téléphone valide')
    ]
}

const signInValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Doit être une adresse email valide'),
        body('password').exists().isLength({ min: 6 })
    ]
} 

const simpleEmailValidationrules = () => {
    return [
        body('email').isEmail().withMessage('Doit être une adresse email valide')
    ]
} 

// MARK: - SPOT VALIDATION
const validateSpot = [
    body('name').isEmpty().withMessage('Ne peut pas être vide')
]

// MARK: - ROOM VALIDATION
const validateRoom = [
    body('name').isEmpty().withMessage('Ne peut pas être vide')
]

// MARK: - RESERVATION VALIDATION
const validateReservation = [
    body('date').isEmpty().withMessage('Ne peut pas être vide'),
    body('spotId').isEmpty().withMessage('Ne peut pas être vide'),
    body('roomId').isEmpty().withMessage('Ne peut pas être vide')
]

module.exports = {
    signUpValidationRules,
    signInValidationRules,
    simpleEmailValidationrules,
    validateSpot,
    validateRoom,
    hasError
}