const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {UserModel}= require('../Schemas/User')
const { ServerModel } = require('../Schemas/Server')
const { TextChannelModel } = require('../Schemas/TextChannel')
const { MessageModel } = require('../Schemas/Message')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res)=>{
    if(!req.body.email){
        return res.status(400).send('email is required')
    }
    if(!req.body.password){
        return res.status(400).send('password is required')
    }
    if(!req.body.name){
        return res.status(400).send('name is required')
    }
    
    const emailExist = await UserModel.findOne({email:req.body.email})

    if(emailExist){
        return res.status(400).send('email alredy exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new UserModel({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword,
        friends:[],
        serverList:[]
    })

    await user.save( err =>{
        if (err) {
            return res.status(400).send('there was and error')
        }
    })
    

    const token = jwt.sign({_id:user._id}, process.env.TOKEN)
    res.status(200).header('auth-token', token).send(token)
})


router.post('/login', async (req,res)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('email or password is incorrect')
    }
    
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
        return res.status(400).send('email or password is incorrect')
    }

    const token = jwt.sign({_id:user._id}, process.env.TOKEN)
    res.header('auth-token', token).send(token).status(200)
})

module.exports = router