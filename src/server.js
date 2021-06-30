<<<<<<< HEAD
const express = require('express')
const cors = require('cors')
=======
const express = require("express");

const userRouter = require("./routers/login");
const listUsers = require("./routers/listUser");
const appoinment = require("./routers/appoinment");
const Prescription = require("./routers/prescription");
const UpdateProfile = require("./routers/updateprofile");
const MedicalRecord = require("./routers/medicalrecord");
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(listUsers);
app.use(appoinment);
app.use(Prescription);
app.use(UpdateProfile);
app.use(MedicalRecord);

<<<<<<< HEAD
const userRouter = require('./routers/login')
const listUsers = require("./routers/listUser")
const appoinment = require("./routers/appoinment")
const Prescription = require('./routers/prescription')
const  Rating  = require('./routers/rating')
const MedicalRecord= require('./routers/medicalrecord')
const UpdateProfile = require("./routers/updateprofile");




const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(listUsers)
app.use(appoinment)
app.use(Prescription)
app.use(Rating)
app.use(MedicalRecord)
app.use(UpdateProfile)





const port = process.env.PORT || 5000

=======
const port = process.env.PORT || 5000;
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd

app.listen(port, () => {
  console.log("server is running in port", port);
});
