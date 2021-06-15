const express = require("express");
const { Appointments, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

router.post("/newapp", (req, res) => {
  const app = new Appointments(req.body);
  try {
    app.save();
    res.send(200);
  } catch {
    res.send(400);
  }
});

router.get("/listapp-patient", async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.send(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

router.get("/listapp-doctor", async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.send(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

module.exports = router;
