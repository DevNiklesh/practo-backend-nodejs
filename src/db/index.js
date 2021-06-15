const mongoose = require('./db')
const User =require('../models/patient')
const Doctor = require('../models/doctors')
const Appointments = require('../models/appointments')




const index = module.exports ={
    mongoose,
    User,
    Doctor}