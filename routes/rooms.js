const express = require("express");
const router = express.Router();

const roomController = require('../Controllers/room.controller');


/* GET */
router.get("/", roomController.get);

/* POST */
router.post("/", roomController.post);

/* PUT */
router.put("/:id", roomController.put);

/* DELETE */
router.delete("/:id", roomController.destroy);

module.exports = router;
