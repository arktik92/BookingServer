const express = require("express");
const router = express.Router();
const validator = require("../middlewares/expressValidator");
const authController = require('../Controllers/auth.controller');

router.post("/signup", validator.signUpValidationRules(), validator.hasError, authController.signUp);

router.post("/signin", validator.signInValidationRules(), validator.hasError, authController.signIn);

router.get("/resetpassword", validator.simpleEmailValidationrules(), validator.hasError, authController.resetPassword);

router.post("/sendemail", validator.simpleEmailValidationrules(), validator.hasError, authController.sendEmailForResetPwd);

router.put("/sendpassword", validator.signInValidationRules(), validator.hasError, authController.sendPassword);

module.exports = router;