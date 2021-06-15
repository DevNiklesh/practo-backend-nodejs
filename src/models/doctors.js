const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const doctorSchema = new mongoose.Schema({

    doctor_id:mongoose.Schema.Types.ObjectId,
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
   
    //generating jwt tokens
    doctorSchema.methods.generateAuthToken = async function() {
      const doctor = this
      
      const token = jwt.sign({ _id:doctor._id.toString()},'thisisforauthentication')
      doctor.tokens = doctor.tokens.concat({ token } )
       await doctor.save()
      return token 
    }

    //hiding private details of the user
    doctorSchema.methods.getPublicProfile = function () {
        const doctor = this
        const doctorObject = doctor.toObject()
        
        delete doctorObject._id
        delete doctorObject.password
        delete doctorObject.tokens
        
        return doctorObject
    }

    doctorSchema.statics.findByCredentials = async (email,password) => {
       
        const user = await Doctor.findOne({ email })
        if(!user) {
           throw new Error ('Email does not exists')
           
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
           throw new Error ('password is incorrect')
            
        }
        return user
    }

  //Hashing the password before saving 
    doctorSchema.pre('save', async function(next)
    {
      const doctor = this

      if(doctor.isModified('password')){
          doctor.password = await bcrypt.hash(doctor.password,8)
      }

      next()

      })

    

    
const Doctor = mongoose.model('Doctor',doctorSchema)
    



module.exports= Doctor