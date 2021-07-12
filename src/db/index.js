<<<<<<< HEAD
const dbconnection = require('./dbconnection')
const Patient =require('../models/patient')
const Doctor = require('../models/doctors')
const Appointments = require('../models/appointments')
const Prescription = require('../models/prescription')
const Rating = require('../models/rating')
const MedicalRecord= require('../models/medicalrecord')





 module.exports = {
    dbconnection,
    Patient,
    Doctor,
    Appointments,
    Prescription,
    Rating,
    MedicalRecord
}
=======
const dbconnection = require("./dbconnection");
const Patient = require("../models/patient");
const Doctor = require("../models/doctors");
const Appointments = require("../models/appointments");
const Prescription = require("../models/prescription");
const Rating = require("../models/rating");
const MedicalRecord = require("../models/medicalrecord");

module.exports = {
  dbconnection,
  Patient,
  Doctor,
  Appointments,
  Prescription,
  Rating,
  MedicalRecord,
};
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
