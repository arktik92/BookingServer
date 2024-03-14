const express = require("express");
const router = express.Router();

const userController = require('../Controllers/user.controller')
const isAdmin = require("../middlewares/authenticate");


/* GET */
router.get("/", isAdmin.checkAdminRole ,userController.get);

router.get("/me", userController.getCurrentUser);

/* PUT */
router.put("/", userController.put);

/* DELETE */
router.delete("/", userController.destroy);

module.exports = router;
