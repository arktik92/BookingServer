const express = require("express");
const router = express.Router();

const dishController = require('../Controllers/dish.controller');

/* GET */
router.get("/", dishController.get);

module.exports = router;