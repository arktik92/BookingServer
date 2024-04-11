const express = require("express");
const router = express.Router();

const roomController = require('../Controllers/room.controller');
const validator = require("../middlewares/expressValidator");
const { checkAdminRole } = require("../middlewares/authenticate");


/* GET */
router.get("/", roomController.get);

/* POST */
router.post("/", validator.validateRoom, checkAdminRole,roomController.post);

/* PUT */
router.put("/:id", validator.validateRoom, checkAdminRole, roomController.put);

/* DELETE */
router.delete("/:id", checkAdminRole, roomController.destroy);

module.exports = router;
