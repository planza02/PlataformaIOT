const mongoose = require("mongoose");
const deviceModel = mongoose.model("Device");
const nodemailer = require("nodemailer");

require("dotenv").config({path: "../variables.env"});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASSWORD
  }
});

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
  const mailOptions = {
    from: process.env.MAIL_ACCOUNT,
    to: "pablo.lan.ser@techtalents.club",
    subject: formattedDate + " || New Alert from Device " + deviceID,
    html: `<p>The device with ID: ${deviceID} sent you an alert ay ${formattedDate} </p>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log(info);
      res.status(200).json(info);
    }
  });
};
