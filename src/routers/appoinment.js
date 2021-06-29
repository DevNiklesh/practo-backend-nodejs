const express = require("express");
const { Appointments, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

router.post("/newapp", (req, res) => {
  try {
    const app = new Appointments(req.body);
    app.save();
    res.send(200);
  } catch {
    res.send(400);
  }
});
router.get("/listapp-patient", authentication, async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

router.get("/listapp-doctor", authentication, async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

router.patch("/update-status", authentication, async (req, res) => {
  try {
    const result = await Appointments.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { accept_status: `${req.query.status}` } }
    );
    result.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
