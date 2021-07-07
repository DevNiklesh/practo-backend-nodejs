const express = require('express')
const { Patient, Doctor } = require('../db/index')
const router = new express.Router()
const authpatient = require("../middleware/authpatient");
const authdoctor = require("../middleware/authdoctor");
const authentication = require("../middleware/authentication");


router.get('/userlist', authentication, function (req, res) {
    Patient.find({}).then(function (users) {
        res.status(200).send(users)
    })
})

router.get('/doctorlist', authpatient, function (req, res) {
    Doctor.find({
        isActive: true,
    }).then(function (users) {
        res.status(200).send(users)
    })
})
router.post("/setActive", authdoctor, async (req, res) => {
    try {

        const result = await Doctor.findOneAndUpdate(
            { _id: `${req.query.id}` },
            { $set: { isActive: req.body.isActive } }
        )


        result.save()
        res.status(200).send("success")
    }
    catch (error) {
        console.log(error.message)
        res.status(400).send(error)
    }

})
router.get("/showProfile", async (req, res) => {
    try {
        var result = await Patient.findOne(
            { _id: `${req.query.id}` })

        var patientObject = result.toObject();
        delete patientObject.password;
        result ? res.status(200).send(patientObject) : res.status(404).send("Not found")
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})
module.exports = router