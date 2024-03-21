require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 5000

const connectDB = require('./utils/db')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routers
const authRouter = require('./routers/auth-router')
app.use('/api/auth',authRouter)

app.get('/',(req,res)=>{
    res.status(200).send("Main home page.")
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`)
    })
})
