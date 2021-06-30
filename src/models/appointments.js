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
<<<<<<< HEAD
=======
      require: true,
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
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
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment", appointmentSchema);
module.exports = Appointments;
