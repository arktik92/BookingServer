const express = require("express");
const router = express.Router();

const spotController = require('../Controllers/spot.controller');
const validator = require("../middlewares/expressValidator");

/* GET */
router.get("/", spotController.get);

/* POST */
router.post("/", validator.validateSpot, spotController.post);

/* PUT */
router.put("/:id", validator.validateSpot, spotController.put);

/* DELETE */
router.delete("/", spotController.destroy);

module.exports = router;
