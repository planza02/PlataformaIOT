const express = require("express");
const router = express.Router();

const deviceController = require("../Controllers/deviceController");

router.post("/create-device", deviceController.createDevice);

module.exports = router;
