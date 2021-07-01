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
