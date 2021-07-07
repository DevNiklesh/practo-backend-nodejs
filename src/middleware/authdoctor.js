const jwt = require("jsonwebtoken");
const { Doctor } = require("../db/index");

const authdoctor = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisforauthentication");
    let user = Doctor.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch {
    res.status(401).send({ error: "Doctors dont have access" });
  }
};

module.exports = authdoctor;
