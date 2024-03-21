const User = require('../models/user-model')

const homeGet = async (req,res)=>{
    try
    {
        res.status(200).send(`Auth home page.`)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

const registrationPost = async (req,res)=>{
    try
    {
        const {username, email, phone, password} = req.body
        const userExists = await User.findOne({email:email})

        if(userExists)
        {
            return res.status(400).json({msg:"Email already exists"})
        }

        const userCreated = await User.create({
            username,
            email,
            phone,
            password,
        })

        res.status(201).json({
            msg: userCreated,
            token: await userCreated.generateToken(),
            userId : userCreated._id.toString()
        }) // get data from server

    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

const loginGet = async (req,res)=>{
    try
    {
        res.status(200).send(`Auth login page.`)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

const loginPost = async (req,res)=>{
    try
    {
        const {email,password} = req.body

        const userExists = await User.findOne({email:email})

        if(!userExists)
        {
            return res.status(400).json({msg:"Invalid credentials."})
        }

        const user = await userExists.comparePassword(password)
        if(user)
        {
            return res.status(200).json({
                msg:"Login successful.",
                token: await userExists.generateToken(),
                userId : userExists._id.toString()
            })
        }
        else{
            return res.status(200).json({
                msg:"Invalid credentials."
            })
        }
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

module.exports = {homeGet , registrationPost, loginGet, loginPost}