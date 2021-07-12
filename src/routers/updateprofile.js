const express = require("express");
const { Doctor, Patient, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const authdoctor = require("../middleware/authdoctor");
const authpatient = require("../middleware/authpatient");
const router = new express.Router();
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 3000000,
  },
  fileFilter(req, file, res) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return res(new Error("Please upload Image"));
    res(undefined, true);
  },
});

//updating the user profile of  doctor
router.post(
  "/doctorprofile",
  authdoctor,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const result = await Doctor.findByIdAndUpdate(
        { _id: `${req.query.id}` },
        {
          $set: {
            age: `${req.body.age}`,
            specialisation: `${req.body.specialisation}`,
            avatar: `${req.file.buffer}`,
          },
        }
      );
      result.avaliableSlots = req.body.slots.split(",");
      result.save();
      res.status(200).send("user profile updated successfully");
    } catch (error) {
      console.log(error);
      res.sendStatus(400).send(error);
    }
  }
);

//updating the user profile of patient
router.post(
  "/patientprofile",
  authpatient,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const result = await Patient.findByIdAndUpdate(
        { _id: `${req.query.id}` },
        {
          $set: {
            age: `${req.body.age}`,
            blood_group: `${req.body.blood_group}`,
            date_of_birth: `${req.body.date_of_birth}`,
            location: `${req.body.location}`,
            avatar: `${req.file.buffer}`,
          },
        }
      );
      result.save();
      res.sendStatus(200).send("user profile updated successfully");
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
