const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const doctorSchema = new mongoose.Schema({
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

    doctorSchema.statics.findByCredentials = async (email,password) => {
       
        const doctor = await doctor.findOne({ email })
        if(!doctor) {
           //throw new Error('Email does not exists')
           return false
           
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if(!isMatch)
        {
         //   throw new Error ('password is incorrect')
         return false
            
        }
        return doctor
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

    

    
const Doctor = mongoose.model('doctor',doctorSchema)
    



module.exports= Doctor