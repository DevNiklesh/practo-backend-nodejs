const express = require("express");
const { Doctor, Patient, dbConnection } = require("../db/index");
const authentication = require("../middleware/authentication");
const router = new express.Router();

//For Signing up New Doctor
<<<<<<< HEAD
router.post('/signup',async (req,res) => {
    
    
      try{
          if(req.body.isDoctor){
            const user = new Doctor(req.body)
         await user.save() 
        const token = await user.generateAuthToken()
        res.sendStatus(201).send({ user:user.getPublicProfile(),token } )
          }
        else{
                const user = new Patient(req.body)
             await user.save() 
            const token = await user.generateAuthToken()
            res.sendStatus(201).send({ user:user.getPublicProfile(),token } )

        }
    }
    catch(error) {
        res.sendStatus(400).send({error:"please enter valid email and password"})
=======
router.post("/signup", async (req, res) => {
  try {
    if (req.body.isDoctor) {
      const user = new Doctor(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user: user.getPublicProfile(), token });
    } else {
      const user = new Patient(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user: user.getPublicProfile(), token });
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
    }
})

//For logging in Doctor
router.post("/login", async (req, res) => {
  try {
    if (req.body.isDoctor) {
      const user = await Doctor.findByCredentials(
        req.body.email,
        req.body.password
      );

      const token = await user.generateAuthToken();
      res.send({ token, user: user.getPublicProfile() });
    } else {
      const user = await Patient.findByCredentials(
        req.body.email,
        req.body.password
      )

<<<<<<< HEAD
      }
        }
        catch(error){
       res.sendStatus(400).send({error:"Unable to login"})
=======
      const token = await user.generateAuthToken();
      res.send({ token, user: user.getPublicProfile() });
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
    }
  
})

module.exports = router;
