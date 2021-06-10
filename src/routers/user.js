const express = require('express')
const index = require('../db/index')
const router = new express.Router()


router.post('/signup', (req,res) => {
    const user =new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)

    }).catch((error) => {
        res.status(200).send(error)
    })
})

router.post('/login', async (req,res) => {
    try{
        const user = await User.findByCredentials( req.body.email, req.body.password)
        res.send(user)
      }catch(error){
       res.status(400).send()
    }
})

module.exports = router