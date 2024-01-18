const express = require("express");
const router = express.Router();
const path = require('path');
const authController = require('../Controllers/auth.controller');

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/resetpassword", (req, res) => {
    const email = req.query.email;
    res.render('resetPassword', { email: email });
    // res.sendFile(path.join(__dirname, '..', 'public', 'resetPassword.html'));
});

router.post("/sendemail", authController.sendEmailForResetPwd);

router.put("/sendpassword", authController.resetPassword);

// On exporte le tout 
module.exports = router;