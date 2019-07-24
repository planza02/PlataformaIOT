const mongoose = require("mongoose");
const DataModel = mongoose.model("Data");

module.exports.saveData = function(req, res) {
  const deviceID = req.body.deviceID;
  const value = req.body.value;

  if (!deviceID) {
    res.status(404).send("Missing ID");
  }

  const newData = new DataModel({
    device: deviceID,
    value: value
  });

  newData.save().then(function(data) {
    if (data) {
      res.status(200).send("Data Saved Succesfully.");
    } else {
      res.status(400).send("Error in Saving Data");
    }
  });
};

module.exports.getDeviceData = function(req, res) {
  const deviceID = req.query.id;

  if (!deviceID) {
    res.status(404).send("Missing ID");
  }

  DataModel.find({ device: deviceID }).then(function(data) {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("No data found");
    }
  });
};
