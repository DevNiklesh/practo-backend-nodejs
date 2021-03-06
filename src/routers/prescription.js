const express = require("express");
const { dbConnection, Prescription, Appointments } = require("../db/index");
const authentication = require("../middleware/authentication");

const router = new express.Router();

<<<<<<< HEAD
router.post('/prescription',async (req,res) => {
    try{
    const prescription =  new Prescription(req.body) 
    await prescription.save()
    res.sendStatus(200).send(prescription)
    }
    catch(error){
        res.sendStatus(400).send({error: 'send valid prescription list'})
    }
})

router.get('/prescriptionlist',async (req,res) => {
    try{  
        const result = await Prescription.find({ appointment_id: `${req.query.id}` })
       res.sendStatus(200).send(result)
    }catch{
        res.sendStatus(400)
    }
})
  
   // updating the new medicines
router.put('/new_prescriptionlist',async (req,res) => {
    try{
       const result = await Prescription.findByIdAndUpdate(
           {_id: `${req.query.id}`},
           {$set : {prescribed_medicines: `${req.query.medicines}`}}
       )
       result.save()
       res.sendStatus(200).send(result)
       }
    catch(error)
    {
        res.sendStatus(400).send(error)
    }
    
})
  //adding more medicines to the list
router.put('/update_prescriptionlist',async (req,res) => {
    try{
       const result = await Prescription.findByIdAndUpdate(
           {_id: `${req.query.id}`},
           {$push : {prescribed_medicines: `${req.query.medicines.split(',')}`}}
       )
       result.save()
       res.sendStatus(200).send(result)
       }
    catch(error)
    {
        res.sendStatus(400).send(error)
    }
    
})
  
  //deleting the medicines
router.delete('/delete_medicines',async (req,res) => {
    try{
        const result = await Prescription.findByIdAndUpdate(
            {_id: `${req.query.id}`},
            {$pull : {'prescribed_medicines':`${req.query.medicines}`}}
        )
        result.save()
        res.sendStatus(200).send(result)
    }
    catch(error){
      res.sendStatus(400).send(error)
    }
    
})
module.exports = router
=======
router.post("/prescription", authentication, async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(200).send(prescription);
  } catch (error) {
    res.status(400).send({ error: "send valid prescription list" });
  }
});

router.get("/prescriptionlist", authentication, async (req, res) => {
  try {
    const result = await Prescription.find({
      appointment_id: `${req.query.id}`,
    });
    res.status(200).send(result);
  } catch {
    res.status(400);
  }
});

// updating the new medicines
router.patch("/update_prescriptionlist", authentication, async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { prescribed_medicines: `${req.query.medicines}` } }
    );
    result.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
//adding more medicines to the list
router.patch("/update_prescriptionlist", authentication, async (req, res) => {
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
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
