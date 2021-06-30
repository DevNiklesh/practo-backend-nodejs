const express = require("express");
const { Appointments, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

router.post("/newapp", (req, res) => {
  try {
    const app = new Appointments(req.body);
    app.save();
<<<<<<< HEAD
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});
router.get("/listapp-patient",async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.sendStatus(404);
=======
    res.send(200);
  } catch {
    res.send(400);
  }
});
router.get("/listapp-patient", authentication, async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.send(404);
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
  } catch {
    res.sendStatus(400);
  }
});

<<<<<<< HEAD
router.get("/listapp-doctor",async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.sendStatus(404);
=======
router.get("/listapp-doctor", authentication, async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.sendStatus(result) : res.send(404);
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
  } catch {
    res.sendStatus(400);
  }
});

<<<<<<< HEAD
router.put("/update-status", async (req, res) => {
=======
router.patch("/update-status", authentication, async (req, res) => {
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
  try {
    const result = await Appointments.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { accept_status: `${req.query.status}` } }
    );
    result.save();
<<<<<<< HEAD
    res.sendStatus(200).send(result);
  } catch (error) {
    res.sendStatus(400).send(error);
=======
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
  }
});

module.exports = router;
