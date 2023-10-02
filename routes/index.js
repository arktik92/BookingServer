const express = require("express");
const router = express.Router();

// Declaration des routeurs 
const reservationRouter = require("./reservations");
const roomRouter = require("./rooms");
const spotRouter = require("./spots");
const userRouter = require("./users");

// Creation des routes principales
router.use("/reservations", reservationRouter);
router.use("/rooms", roomRouter);
router.use("/spots", spotRouter);
router.use("/users", userRouter);

module.exports = router;
