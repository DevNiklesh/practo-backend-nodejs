const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    apointmentId:{
        type:String,
        require:true,
        trim:true
    },
    
    appointment_time: {
     type:String,
     require:true,
    
     },
    accept_status: {
       type:Boolean,
       require:true

    },
    doctor_id:{
        type:String,
        require:true
    },
    patient_id:{
        type:String,
        require:true,
    }
})

const Appointments = mongoose.model('appointment',appointmentSchema)
module.exports= Appointments