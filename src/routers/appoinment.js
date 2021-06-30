const express = require("express");
const { Appointments, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

router.post("/newapp", (req, res) => {
  try {
    const app = new Appointments(req.body);
    app.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});
router.get("/listapp-patient", async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.send(result) : res.sendStatus(404);
  } catch {
    res.sendStatus(400);
  }
});

router.get("/listapp-doctor", async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.send(result) : res.sendStatus(404);
  } catch {
    res.sendStatus(400);
  }
});

router.put("/update-status", async (req, res) => {
  try {
    const result = await Appointments.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { accept_status: `${req.query.status}` } }
    );
    result.save();
    res.sendStatus(200).send(result);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});

module.exports = router;
