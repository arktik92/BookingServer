const express = require("express");
const router = express.Router();
const validator = require("../middlewares/expressValidator");
const authController = require('../Controllers/auth.controller');


router.post("/signup", validator.validateUser, authController.signUp);

router.post("/signin", validator.ValidateSignIn, authController.signIn);

router.get("/resetpassword", validator.validateEmail, authController.resetPassword);

router.post("/sendemail", validator.validateEmail, authController.sendEmailForResetPwd);

router.put("/sendpassword", validator.ValidateSignIn, authController.sendPassword);

module.exports = router;