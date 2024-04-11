const express = require("express");
const router = express.Router();

const dishController = require('../Controllers/dish.controller');
const { checkAdminRole } = require("../middlewares/authenticate");

/* GET */
router.get("/", dishController.get);

/* POST */
router.post("/", checkAdminRole, dishController.post);

module.exports = router;