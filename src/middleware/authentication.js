const jwt = require("jsonwebtoken");
const { Patient, Doctor } = require("../db/index");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisforauthentication");
    let user = await Doctor.findOne({ _id: decoded._id });
    if (!user) {
      user = await Patient.findOne({ _id: decoded._id });
      if (!user) return res.status(400).send("You dont have access");
    }
    req.user = user;
    next();
  } catch {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = authentication;
