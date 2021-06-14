const jwt = require('jsonwebtoken')
const User = require('../models/user')


const authentication = async (req,res,next) => {
    try{
  const token = req.header('Authorization').replace('Bearer ','')
  const decoded = jwt.verify(token,'thisisforauthentication')
  const user = User.findOne({_id:decoded._id , 'tokens.token':token})
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