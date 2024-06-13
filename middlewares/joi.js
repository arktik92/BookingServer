const Joi = require('@hapi/joi');

// Définissez un schéma de validation pour les données d'inscription
const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phoneNumber: Joi.string().required(),
});

module.exports = {
    signUpSchema
};