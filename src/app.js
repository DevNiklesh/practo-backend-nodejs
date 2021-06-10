const express = require('express')




const userRouter = require('./routers/user')

const app = express()
app.use(express.json())
app.use(userRouter)


const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log("server is running")

})
