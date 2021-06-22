const express = require("express");
const {Doctor,Patient, Appointments, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

router.post("/newapp", (req, res) => {
  
  try {
    const app = new Appointments(req.body);
    app.save()
    res.send(200)
  }
   catch {
    res.send(400);
  }
});
router.get("/listapp-patient",authentication, async (req, res) => {
  try {
    const result = await Appointments.find({ patient_id: `${req.query.id}` });
    result.length ? res.send(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

router.get("/listapp-doctor", authentication,async (req, res) => {
  try {
    const result = await Appointments.find({ doctor_id: `${req.query.id}` });
    result.length ? res.send(result) : res.send(404);
  } catch {
    res.send(400);
  }
});

router.patch("/update-status",authentication,async (req, res) => {
  try {
   const result= await Appointments.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { accept_status: `${req.query.status}` } }
    )
    result.save()
    res.status(200).send(result)
  } catch(error)
  {
    res.status(400).send(error)
  }
})

//updating the user profile of  doctor
router.patch("/doctorprofile",authentication, async (req,res) => {
  try{
    const result = await Doctor.findByIdAndUpdate(
      {_id: `${req.query.id}`},
      {$set: 
        {age: `${req.body.age}`,
       specialisation: `${req.body.specialisation}`}
      },
    )
    result.save()
    res.status(200).send('user profile updated successfully')
  }
  catch(error){
    res.status(400).send(error)
  }
})

//updating the user profile of patient
router.patch("/patientprofile",authentication, async (req,res) => {
  try{
    const result = await Patient.findByIdAndUpdate(
      {_id: `${req.query.id}`},
      {$set: 
        {
        age: `${req.body.age}`,
        blood_group: `${req.body.blood_group}`,
        date_of_birth: `${req.body.date_of_birth}`,
        location: `${req.body.location}`
       }
      }
    )
    result.save()
    res.status(200).send('user profile updated successfully')
  }
  catch(error){
    res.send(error)
  }
})

    


module.exports = router;
