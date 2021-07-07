const {
    Doctor,
    Patient
   } = require('../db/index')

//@desc getting or fetching a doctor
//@route GET/doctor/:id
//@access Public
exports.getDoctor = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        res.send({success:true, data: doctor.getPublicProfile()})
        
    } catch (error) {
        res.sendStatus(400).json({success:false})
        
    }

}

//@desc getting or fetching all doctors
//@route GET/doctorlist
//@access Public
exports.getDoctors = async (req,res) => {
    try {
        const Doctors = await Doctor.find()
        res.sendStatus(200).json({success:true ,data:Doctors})
    } catch (error) {
        res.status(400).json({success:false}) 
    }
}



//@desc getting or fetching all patients
//@route GET/userlist
//@access Public
exports.getPatients = async (req,res,next) => {
    try {
        const Patients = await Patient.find()
        res.sendStatus(200).json({success:true, data: Patients})
        
    } catch (error) {
        res.sendStatus(400).json({success:false})
        
    }

}

//@desc getting or fetching patient
//@route GET/user/:id
//@access Public
exports.getPatient = async (req,res,next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        res.send({success:true, data: patient.getPublicProfile()})
        
    } catch (error) {
        res.sendStatus(400).json({success:false})
        
    }

}
