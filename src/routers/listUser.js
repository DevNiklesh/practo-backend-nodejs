const express = require('express')
const {User,Doctor,Appointments}= require('../db/index')
const authentication = require('../middleware/authentication')
const router = new express.Router()

//return all the users
router.get('/userlist' , authentication, function (req , res) {
    User.find({}).then(function (users) {
    res.send(users);
    });
   });

   router.get('/doctorlist',authentication ,function (req , res) {
    Doctor.find({}).then(function (users) {
    res.send(users);
    });
   });


   module.exports = router