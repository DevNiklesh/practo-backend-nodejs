const express = require("express");
const { dbConnection, Prescription, Appointments } = require("../db/index");
const authentication = require("../middleware/authentication");
const authpatient = require("../middleware/authpatient");
const authdoctor = require("../middleware/authdoctor");

const router = new express.Router();


router.post("/setPrescription", authdoctor, async (req, res) => {
  try {


    const presc = new Prescription(req.body)
    await presc.save()
    res.status(200).send("Presctiption has been saved successfully")
  }
  catch (error) {
    res.status(400).send({ error: "prescription save failed" })
  }
})


router.get("/prescriptionlist", authentication, async (req, res) => {
  try {

    var result = await Prescription.find({
      appointment_id: `${req.query.id}`,
    });
    res.status(200).send(result[0].prescribed_medicines);
  } catch {
    res.status(400);
  }
});

// updating the new medicines
router.put("/update_prescriptionlist", authdoctor, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { prescribed_medicines: `${req.body.medicines}` } }
    );
    result.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
//adding more medicines to the list
router.put("/update_prescriptionlist", authdoctor, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $push: { prescribed_medicines: `${req.query.medicines}` } }
    );
    result.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
