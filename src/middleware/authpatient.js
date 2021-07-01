const jwt = require("jsonwebtoken");
const { Patient } = require("../db/index");

const authpatient = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisforauthentication");
    let user = await Patient.findOne({ _id: decoded._id });
    if (!user)
      return res.status(400).send("You dont have access to Doctors data");
    req.user = user;
    next();
  } catch {
    res.status(400).send({ error: "please authenticate" });
  }
};

module.exports = authpatient;
