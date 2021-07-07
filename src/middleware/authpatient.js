const jwt = require("jsonwebtoken");
const { Patient } = require("../db/index");

const authpatient = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisforauthentication");
    let user = Patient.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch {
    res.status(401).send({ error: "Patients dont have access" });
  }
};

module.exports = authpatient;
