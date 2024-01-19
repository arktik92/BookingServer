const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/admin.controller.js");

router.put('/editrole/:id', adminController.editRole);

module.exports = router;