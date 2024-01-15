const express = require("express");
const router = express.Router();

const userController = require('../Controllers/user.controller')



/* GET */
router.get("/", userController.get);

router.get("/me", userController.getCurrentUser);

/* PUT */
router.put("/:id", userController.put);

/* DELETE */
router.delete("/", userController.destroy);

module.exports = router;
