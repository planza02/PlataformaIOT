const mongoose = require("mongoose");
const deviceModel = mongoose.model("Device");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  deviceModel
    .findById(deviceID)
    .then(function(device) {
      if (device) {
        res.json(device);
      } else {
        res.status(404).send("No device found with this ID");
      }
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
};

module.exports.updateDevice = function(req, res) {
  const deviceID = req.body.deviceID;
  const newStatus = req.body.status;

  deviceModel
    .findByIdAndUpdate(deviceID, { status: newStatus })
    .then(function(device) {
      if (device) {
        res.status(200).send("Device Update Successfully");
      } else {
        res.status(400).send("Error While Updating Device");
      }
    });
};

module.exports.sendEmail = function(req, res) {
  const deviceID = req.body.deviceID;
  const date = new Date();
  const formattedDate = date.toISOString();
  const msg = {
    to: "pablolanza892@gmail.com",
    from: "KeanuReeves@theMatrix.com",
    subject: `Alert from device: ${deviceID} || Date: ${formattedDate} </p>`,
    text: `Alert from device: ${deviceID} || Date: ${formattedDate} </p>`,
    html: `<h1> Alert from device: ${deviceID} || Date: ${formattedDate} </h1>`
  };

  sgMail.send(msg).then(function(message) {
    console.log(message);
    if (message) {
      res.status(200).send("Email Sent.");
    }
  });
};
