const express = require("express");
const { Appointments, dbConnection } = require("../db/index");
const authpatient = require("../middleware/authpatient");
const authdoctor = require("../middleware/authdoctor");
const router = new express.Router();

router.post("/newapp", authpatient, (req, res) => {
  try {
    const app = new Appointments(req.body);
    app.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});
router.get("/listapp-patient", authpatient, async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length
      ? res.status(200).send(result)
      : res.status(404).send("404 error");
  } catch {
    res.sendStatus(400);
  }
});

router.get("/listapp-doctor", authdoctor, async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.status(200).send(result) : res.sendStatus(404);
  } catch {
    res.sendStatus(400);
  }
});

router.patch("/update-status", authpatient, async (req, res) => {
  try {
    const result = await Appointments.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { accept_status: `${req.query.status}` } }
    );
    res.status(200).send("Status updated");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
