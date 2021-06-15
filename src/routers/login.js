const express = require('express')
const {Doctor,dbConnection}= require('../db/index')
const authentication = require('../middleware/authentication')
const router = new express.Router()

//For Signing up New Doctor
router.post('/signup',async (req,res) => {
    const doctor = new Doctor(req.body)
    
      try{
         await doctor.save() 
        const token = await doctor.generateAuthToken()
        res.status(201).send({ doctor:doctor.getPublicProfile(),token } )

    }
    catch(error) {
        res.status(400).send({error:"please enter valid email and password"})
    }
})
//For logging in Doctor
router.post('/login',async (req,res) => {
    try{
        const doctor = await Doctor.findByCredentials( req.body.email, req.body.password)
        const token = await doctor.generateAuthToken()
        res.send({token,doctor:doctor.getPublicProfile()})
      }catch(error){
       res.status(400).send({error:"Unable to login"})
    }
})

module.exports = router