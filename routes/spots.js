const express = require("express");
const router = express.Router();

const spotController = require('../Controllers/spot.controller');
const validator = require("../middlewares/expressValidator");
const { checkAdminRole } = require("../middlewares/authenticate");

/* GET */
router.get("/", spotController.get);

/* POST */
router.post("/", validator.validateSpot, checkAdminRole, spotController.post);

/* PUT */
router.put("/:id", validator.validateSpot, checkAdminRole, spotController.put);

/* DELETE */
router.delete("/", checkAdminRole, spotController.destroy);

module.exports = router;
