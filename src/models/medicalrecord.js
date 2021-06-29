const mongoose = require("mongoose");

const medicalrecordSchema = new mongoose.Schema(
  {
    medicHistory_id: mongoose.Schema.Types.ObjectId,
    patient_id: {
      type: String,
    },
    name: {
      type: String,
    },
    currentMedicine: {
      type: Array,
    },
    medicaldoc: {
      type: Array,
    },
    xray: {
      type: Array,
    },
    report: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalHistory = mongoose.model("medicHistory", medicalrecordSchema);
module.exports = MedicalHistory;
