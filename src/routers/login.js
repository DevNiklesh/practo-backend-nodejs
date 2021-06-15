const express = require('express')
<<<<<<< HEAD
const {Doctor,Patient,dbConnection}= require('../db/index')
=======
const {Doctor,dbConnection}= require('../db/index')
>>>>>>> 7a5e201e7ee172edacd007269d0c69cbc33a5e28
const authentication = require('../middleware/authentication')
const router = new express.Router()

//For Signing up New Doctor
router.post('/signup',async (req,res) => {
<<<<<<< HEAD
    
    
      try{
          if(req.body.isDoctor){
            const user = new Doctor(req.body)
         await user.save() 
        const token = await user.generateAuthToken()
        res.status(201).send({ user:user.getPublicProfile(),token } )
          }
        else{
                const user = new Patient(req.body)
             await user.save() 
            const token = await user.generateAuthToken()
            res.status(201).send({ user:user.getPublicProfile(),token } )
=======
    const doctor = new Doctor(req.body)
    
      try{
         await doctor.save() 
        const token = await doctor.generateAuthToken()
        res.status(201).send({ doctor:doctor.getPublicProfile(),token } )
>>>>>>> 7a5e201e7ee172edacd007269d0c69cbc33a5e28

        }
    }
    catch(error) {
        res.status(400).send({error:"please enter valid email and password"})
    }
})
//For logging in Doctor
router.post('/login',async (req,res) => {
    try{
<<<<<<< HEAD
        if(req.body.isDoctor){
            const user = await Doctor.findByCredentials( req.body.email, req.body.password)
            
        const token = await user.generateAuthToken()
        res.send({token,user:user.getPublicProfile()})
      }
      else{
        const user = await Patient.findByCredentials( req.body.email, req.body.password)
            
        const token = await user.generateAuthToken()
        res.send({token,user:user.getPublicProfile()})

      }
        }
        
        
        catch(error){
=======
        const doctor = await Doctor.findByCredentials( req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()
        res.send({token,doctor:doctor.getPublicProfile()})
      }catch(error){
>>>>>>> 7a5e201e7ee172edacd007269d0c69cbc33a5e28
       res.status(400).send({error:"Unable to login"})
    }
})

module.exports = router