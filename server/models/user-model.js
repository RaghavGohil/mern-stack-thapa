const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){
    const user = this
    if(!user.isModified("password")){
        next()
    }
    try{
        const saltRounds = 10
        const bcrypt_password = await bcrypt.hash(user.password, saltRounds)
        user.password = bcrypt_password
        next()
    } catch(err) {
        next(err)
    }
})

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_KEY,
        {
            expiresIn:"30d"
        })
    }catch(err){
        console.log(err)
    }
}

userSchema.methods.comparePassword = async function(password)
{
    return bcrypt.compare(password,this.password)
}

const User = mongoose.model('User',userSchema)

module.exports = User