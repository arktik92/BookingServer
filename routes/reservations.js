const express = require("express");
const router = express.Router();

const reservationController = require('../Controllers/reservations.controller')


/* GET */
router.get("/", reservationController.get);
router.get ("/userreservations", reservationController.getUserReservations);

/* POST */
router.post("/", reservationController.post);

/* PUT */
router.put("/:id", reservationController.put);

/* DELETE */
router.delete("/:id", reservationController.destroy);

module.exports = router;
