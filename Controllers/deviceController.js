const mongoose = require("mongoose");
const deviceModel = mongoose.model("Device");

module.exports.createDevice = function(req, res) {
  const name = req.body.name;
  const type = req.body.type;

  if (!name) {
    res.status(400).send("Missing name");
  }

  const newDevice = deviceModel({
    name: name,
    type: type
  });

  newDevice.save().then(function(device) {
    if (device) {
      res.status(200).send("Device Created");
    } else {
      res.status(400).send("Device Creation Failed");
    }
  });
};

module.exports.getDevices = function(req, res) {
  deviceModel.find({}).then(function(devices) {
    res.json(devices);
  });
};

module.exports.getDeviceByID = function(req, res) {
  const deviceID = req.query.id;
  deviceModel.findById(deviceID).then(function(device) {
    if (device) {
      res.json(device);
    } else {
      res.status(404).send("No device found with this ID");
    }
  });
};
