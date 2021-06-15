const express = require('express')
const {User,dbConnection}= require('../db/index')
const authentication = require('../middleware/authentication')
const router = new express.Router()

//For Signing up New User
router.post('/signup',async (req,res) => {
    const user = new User(req.body)
    
      try{
         await user.save() 
        const token = await user.generateAuthToken()
        res.status(201).send({ user,token } )

    }
    catch(error) {
        res.status(400).send({error:"please enter valid email and password"})
    }
})
//For logging in User
router.post('/login',async (req,res) => {
    try{
        const user = await User.findByCredentials( req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({token,user})
      }catch(error){
       res.status(400).send({error:"Unable to login"})
    }
})

module.exports = router