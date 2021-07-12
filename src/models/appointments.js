const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointment_time: {
      type: String,
      require: true,
    },
    accept_status: {
      type: String,
      default: "Pending",
    },
    doctor_id: {
      type: String,
      require: true,
    },
    patient_id: {
      type: String,
      require: true,
    },
<<<<<<< HEAD
    appointment_date:{
      type:String,
      default:null
    }
=======
    appointment_date: {
      type: String,
      default: null,
    },
>>>>>>> c222751dcd8bb59f48fb8399809974dc3ed9f885
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment", appointmentSchema);
module.exports = Appointments;
