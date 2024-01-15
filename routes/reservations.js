const express = require("express");
const router = express.Router();

const reservationController = require('../Controllers/reservations.controller')


/* GET */
router.get("/", reservationController.get);

/* POST */
router.post("/", reservationController.post);

// PUT: update a reservation
router.put("/:id", reservationController.put);

/* DELETE */
router.delete("/", reservationController.destroy);

module.exports = router;
