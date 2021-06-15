const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const patientSchema = new mongoose.Schema({
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
    patientSchema.methods.generateAuthToken = async function() {
      const patient = this
      
      const token = jwt.sign({ _id:user._id.toString()},'thisisforauthentication')
       await user.save()
       return token
      
    }

    patientSchema.statics.findByCredentials = async (email,password) => {
       
        const user = await User.findOne({ email })
        if(!user) {
            throw new Error('Email does not exists')
        }

        const isMatch = await bcrypt.compare(password,patient.password)
        if(!isMatch)
        {
            throw new Error ('password is incorrect')
        }
        return patient
    }

  //Hashing the password before saving 
    patientSchema.pre('save', async function(next)
    {
      const patient = this

      if(patient.isModified('password')){
          patient.password = await bcrypt.hash(patient.password,8)
      }

      next()

      })

    

    
const patient = mongoose.model('patient',patientSchema)
    



module.exports= patient