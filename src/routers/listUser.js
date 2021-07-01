const express = require("express");
const { Patient, Doctor } = require("../db/index");
const router = new express.Router();
const authentication = require("../middleware/authentication");
//return all the users
router.get("/userlist", authentication, function (req, res) {
  Patient.find({}).then(function (users) {
    res.send(users);
  });
});

router.get("/doctorlist", authentication, function (req, res) {
  Doctor.find({}).then(function (users) {
    res.send(users);
  });
});

module.exports = router;
