const express = require("express");
const router = express.Router();
const authController = require('../Controllers/auth.controller')

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

// On exporte le tout 
module.exports = router;