const express = require("express");
const router = express.Router();

const reservationRouter = require("./reservations");
const roomRouter = require("./rooms");
const spotRouter = require("./spots");
const userRouter = require("./users");

router.use("/reservations", reservationRouter);
router.use("/rooms", roomRouter);
router.use("/spots", spotRouter);
router.use("/users", userRouter);

module.exports = router;
