const express = require("express");
const router = express.Router();

const deviceController = require("../Controllers/deviceController");

router.post("/create-device", deviceController.createDevice);
router.get("/devices", deviceController.getDevices);
router.get("/device", deviceController.getDeviceByID);

module.exports = router;
