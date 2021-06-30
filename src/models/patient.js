const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema({
  patient_id: mongoose.Types.ObjectId,
  avatar: {
    type: Buffer,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password should be strong enough");
      }
    },
  },
  isDoctor: {
    type: Boolean,
    require: true,
  },
  age: {
    type: Number,
  },
  blood_group: {
    type: String,
  },
<<<<<<< HEAD
  date_of_birth:{
    type:Date
  },
  location:{
    type:String
  },
  avatar: {
    type: Buffer,
  },
=======
  date_of_birth: {
    type: String,
  },
  location: {
    type: String,
  },
  onBoarding: {
    type: Boolean,
    default: true,
    require: false,
  },
});
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd

//hiding private data of user
patientSchema.methods.getPublicProfile = function () {
  const patient = this;
  const patientObject = patient.toObject();

  delete patientObject.isDoctor;
  delete patientObject.password;
  delete patientObject.tokens;

  return patientObject;
};

//generating jwt tokens
patientSchema.methods.generateAuthToken = async function () {
  const patient = this;

<<<<<<< HEAD
        
    //hiding private data of user
    patientSchema.methods.getPublicProfile = function () {
        const patient = this
        const patientObject = patient.toObject()
        
      
        delete patientObject.password
        delete patientObject.tokens
        
        return patientObject
    }
   
    //generating jwt tokens
    patientSchema.methods.generateAuthToken = async function() {
      const patient = this
      
      const token = jwt.sign({ _id:patient._id.toString()},'thisisforauthentication')
       await patient.save()
       return token
      
    }
=======
  const token = jwt.sign(
    { _id: patient._id.toString() },
    "thisisforauthentication",
    { expiresIn: "1 hour" }
  );
  await patient.save();
  return token;
};
>>>>>>> fc0fbca33d86fad256bff4242ff06011994d64dd

//validating email and password of the patient
patientSchema.statics.findByCredentials = async (email, password) => {
  const user = await Patient.findOne({ email });
  if (!user) {
    throw new Error("Email does not exists");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};

//Hashing the password before saving
patientSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
