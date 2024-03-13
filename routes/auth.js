const express = require("express");
const router = express.Router();
const path = require('path');
const authController = require('../Controllers/auth.controller');

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/resetpassword", authController.resetPassword);

router.post("/sendemail", authController.sendEmailForResetPwd);

router.put("/sendpassword", authController.sendPassword);

module.exports = router;