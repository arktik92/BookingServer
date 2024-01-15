const express = require("express");
const router = express.Router();

const spotController = require('../Controllers/spot.controller');



/* GET */
router.get("/", spotController.get);

/* POST */
router.post("/", spotController.post);

/* PUT */
router.put("/:id", spotController.put);

/* DELETE */
router.delete("/", spotController.destroy);

module.exports = router;
