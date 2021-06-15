const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema = new mongoose.Schema({
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
    userSchema.methods.generateAuthToken = async function() {
      const user = this
      
      const token = jwt.sign({ _id:user._id.toString()},'thisisforauthentication')
       await user.save()
       return token
      
    }

    userSchema.statics.findByCredentials = async (email,password) => {
       
        const user = await User.findOne({ email })
        if(!user) {
            throw new Error('Email does not exists')
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            throw new Error ('password is incorrect')
        }
        return user
    }

  //Hashing the password before saving 
    userSchema.pre('save', async function(next)
    {
      const user = this

      if(user.isModified('password')){
          user.password = await bcrypt.hash(user.password,8)
      }

      next()

      })

    

    
const User = mongoose.model('User',userSchema)
    



module.exports= User