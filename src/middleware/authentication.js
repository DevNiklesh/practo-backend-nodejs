const jwt = require('jsonwebtoken')
const Patient = require('../models/patient')


const authentication = async (req,res,next) => {
    try{
  const token = req.header('Authorization').replace('Bearer ','')
  const decoded = jwt.verify(token,'thisisforauthentication')
  const user = Patient.findOne({_id:decoded._id , 'tokens.token':token})
      if(!user)
      {
          throw new Error()
      }
      req.user=user
      next()                                        
    }                      
    catch{
       res.status(401).send({error: "please authenticate"})
    }

}

module.exports=authentication