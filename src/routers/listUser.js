const express = require('express')
const {Patient,Doctor}= require('../db/index')
const router = new express.Router()

//return all the users
router.get('/userlist' ,function (req , res) {
    Patient.find({}).then(function (users) {
    res.send(users)
    })
   })

   router.get('/doctorlist',function (req , res) {
    Doctor.find({}).then(function (users) {
    res.send(users)
    })
   })

  



   module.exports = router