const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate.js");

// Declaration des routeurs 
const reservationRouter = require("./reservations");
const roomRouter = require("./rooms");
const spotRouter = require("./spots");
const userRouter = require("./users");
const adminRouter = require("./admin");
const dishRouter = require("./dish");

// Creation des routes principales
router.use("/reservations", reservationRouter);
router.use("/rooms", roomRouter);
router.use("/spots", spotRouter);
router.use("/users", userRouter);
router.use("/dish", dishRouter);
router.use("/admin", authenticate.checkAdminRole, adminRouter);

module.exports = router;
