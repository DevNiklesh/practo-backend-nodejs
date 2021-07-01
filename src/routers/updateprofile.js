const express = require("express");
const { Doctor, Patient, dbConnection } = require("../db/index");
const authpatient = require("../middleware/authpatient");
const authdoctor = require("../middleware/authdoctor");
const authentication = require("../middleware/authentication");
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
router.post("/doctorprofile", authdoctor, async (req, res) => {
  try {
    const result = await Doctor.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      {
        $set: {
          age: `${req.body.age}`,
          specialisation: `${req.body.specialisation}`,
        },
      }
    );
    result.avaliableSlots = req.body.slots.split(",");
    result.save();
    res.status(200).send("user profile updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post(
  "/doctorprofilepic",
  authdoctor,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const result = await Doctor.findByIdAndUpdate(
        { _id: `${req.query.id}` },
        {
          $set: {
            avatar: `${req.file.buffer}`,
          },
        }
      );
      result.save();
      res.status(200).send("user profile picture updated successfully");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

router.post(
  "/patientprofilepic",
  authpatient,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const result = await Patient.findByIdAndUpdate(
        { _id: `${req.query.id}` },
        {
          $set: {
            avatar: `${req.file.buffer}`,
          },
        }
      );
      result.save();
      res.status(200).send("user profile picture updated successfully");
    } catch {
      res.status(400).send("No user");
    }
  }
);

//updating the user profile of patient
router.post("/patientprofile", authpatient, async (req, res) => {
  try {
    const result = await Patient.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      {
        $set: {
          age: `${req.body.age}`,
          blood_group: `${req.body.blood_group}`,
          date_of_birth: `${req.body.date_of_birth}`,
          location: `${req.body.location}`,
        },
      }
    );
    result.save();
    res.status(200).send("user profile updated successfully");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
