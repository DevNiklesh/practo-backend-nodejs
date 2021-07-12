const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/login");
const listUsers = require("./routers/user");
const appoinment = require("./routers/appoinment");
const Prescription = require("./routers/prescription");
const Rating = require("./routers/rating");
const MedicalRecord = require("./routers/medicalrecord");
const UpdateProfile = require("./routers/updateprofile");
const errorHandler = require('./middleware/error')
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());





app.use(userRouter);
app.use(listUsers);
app.use(appoinment);
app.use(Prescription);
app.use(Rating);
app.use(MedicalRecord);
app.use(UpdateProfile);

app.use(errorHandler)

const port = process.env.PORT || 5000;

const __dirName = path.resolve()
app.use(express.static(path.join(__dirName, "/frontend/build")))


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirName, "frontend", "build", "index.html"));
});
app.listen(port, () => {
  console.log("server is running in port", port);
});
