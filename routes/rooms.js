const express = require("express");
const router = express.Router();

const roomController = require('../Controllers/room.controller');
const validator = require("../middlewares/expressValidator");


/* GET */
router.get("/", roomController.get);

/* POST */
router.post("/", validator.validateRoom,roomController.post);

/* PUT */
router.put("/:id", validator.validateRoom, roomController.put);

/* DELETE */
router.delete("/:id", roomController.destroy);

module.exports = router;
