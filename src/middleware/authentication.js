const jwt = require('jsonwebtoken')
const {Patient,Doctor} = require('../db/index')


const authentication = async (req,res,next) => {
    try{
         if(isDoctor)
         {
  const token = req.header('Authorization').replace('Bearer ','')
  const decoded = jwt.verify(token,'thisisforauthentication')
  const user = Doctor.findOne({_id:decoded._id , 'tokens.token':token})
      if(!user)
      {
          throw new Error()
      }
    }
    else{
        const token = req.header('Authorization').replace('Bearer ','')
  const decoded = jwt.verify(token,'thisisforauthentication')
  const user = Patient.findOne({_id:decoded._id , 'tokens.token':token})
      if(!user)
      {
          throw new Error()
      }
    }

    
      req.user=user

      next()                                        
    }                      
    catch{
       res.status(401).send({error: "please authenticate"})
    }

}

module.exports=authentication