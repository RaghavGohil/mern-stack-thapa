const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async()=>{
    try
    {
        await mongoose.connect(MONGODB_URI)
        console.log('connection to the database is successful.')
    }
    catch(err)
    {
        console.log(`connection to the database is failed. + ${err}`)
    }
}

module.exports = connectDB