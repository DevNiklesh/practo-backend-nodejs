const express = require("express");
const { dbConnection, Prescription, Appointments } = require("../db/index");
const authentication = require("../middleware/authentication");

const router = new express.Router();

router.post("/prescription", authentication, async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(200).send(prescription);
  } catch (error) {
    res.sendStatus(400).send({ error: "send valid prescription list" });
  }
});

router.get("/prescriptionlist", authentication, async (req, res) => {
  try {
    const result = await Prescription.find({
      appointment_id: `${req.query.id}`,
    });
    res.sendStatus(200).send(result);
  } catch {
    res.sendStatus(400);
  }
});

// updating the new medicines
router.put("/update_prescriptionlist", authentication, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { prescribed_medicines: `${req.query.medicines}` } }
    );
    result.save();
    res.sendStatus(200).send(result);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});
//adding more medicines to the list
router.put("/update_prescriptionlist", authentication, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $push: { prescribed_medicines: `${req.query.medicines}` } }
    );
    result.save();
    res.sendStatus(200).send(result);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});

//deleting the medicines
router.delete("/delete_medicines", authentication, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $pull: { prescribed_medicines: `${req.query.medicines}` } }
    );
    result.save();
    res.sendStatus(200).send(result);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});
module.exports = router;
