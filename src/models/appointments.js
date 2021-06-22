const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  
  appointment_time: {
    type: String,
    require: true,
  },
  accept_status: {
    type: String,
    default: "Pending",
    require: true,
  },
  doctor_id: {
    type: String,
    require: true,
  },
  patient_id: {
    type: String,
    require: true,
  },
},{
  timestamps:true
})

const Appointments = mongoose.model("appointment", appointmentSchema);
module.exports = Appointments;
