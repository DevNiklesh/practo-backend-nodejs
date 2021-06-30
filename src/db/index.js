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
const MedicalRecord = require("../models/medicalrecord");

const index = (module.exports = {
  dbconnection,
  Patient,
  Doctor,
  Appointments,
  Prescription,
  MedicalRecord,
});
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
