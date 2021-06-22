const express = require('express')




const userRouter = require('./routers/login')
const listUsers = require("./routers/listUser")
const appoinment = require("./routers/appoinment")
const Prescription = require('./routers/prescription')



const app = express()
app.use(express.json())
app.use(userRouter)
app.use(listUsers)
app.use(appoinment)
app.use(Prescription)


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log("server is running in port", port)
    

})
