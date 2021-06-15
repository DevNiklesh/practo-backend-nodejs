const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema({
<<<<<<< HEAD
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
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

//hiding private data of user
// userSchema.methods.getPublicProfile = function () {
//     const user = this
//     const userObject = user.toObject()
=======
        patient_id:mongoose.Schema.Types.ObjectId,
        name:{
            type:String,
            require:true,
            trim:true
    
        },
        
        email: {
         type:String,
         require:true,
         unique:true,
         trim:true,
         lowercase:true,
         validate(value){
             if(!validator.isEmail(value))
             {
                 throw new Error('Email is invalid')
             }
    
         }
    
        },
        password: {
            type:String,
            require:true,
            validate(value){
                if(!validator.isStrongPassword(value))
                {
                    throw new Error('Password should be strong enough')
                }
            }
    
        },
        tokens:[{
            token:{
                type:String,
                require:true
            }
        }]
    })

    //hiding private data of user
    patientSchema.methods.getPublicProfile = function () {
<<<<<<< HEAD
        const patient = this
        const patientObject = patient.toObject()
=======
        const user = this
        const userObject = user.toObject()
>>>>>>> 7a5e201e7ee172edacd007269d0c69cbc33a5e28
        
        delete patientObject._id
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

    patientSchema.statics.findByCredentials = async (email,password) => {
       
        const user = await Patient.findOne({ email })
        if(!user) {
            throw new Error('Email does not exists')
        }
>>>>>>> be637aaa9ddd9dda21be21cda80eebbf720e36ce

//     delete userObject._id
//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

//generating jwt tokens
patientSchema.methods.generateAuthToken = async function () {
  const patient = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    "thisisforauthentication"
  );
  await user.save();
  return token;
};

patientSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email does not exists");
  }

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return patient;
};

//Hashing the password before saving
patientSchema.pre("save", async function (next) {
  const patient = this;

<<<<<<< HEAD
  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
=======
    
const Patient = mongoose.model('Patient',patientSchema)
    
>>>>>>> be637aaa9ddd9dda21be21cda80eebbf720e36ce

  next();
});

const patient = mongoose.model("patient", patientSchema);

<<<<<<< HEAD
module.exports = patient;
=======
module.exports= Patient
>>>>>>> be637aaa9ddd9dda21be21cda80eebbf720e36ce
