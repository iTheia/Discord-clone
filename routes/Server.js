const express = require('express')
const router = express.Router()
const verifycation = require('./verifyToken')
const { ServerModel } = require('../Schemas/Server')
const { UserModel } = require('../Schemas/User')
const { TextChannelModel } = require('../Schemas/TextChannel')
const { MessageModel } = require('../Schemas/Message')
const { ResumedUserModel } = require('../Schemas/ResumedUser')

router.get('/', verifycation, async (req,res) =>{

    const user = await UserModel.findById(req.user._id, 'friends serverList pendingRequest name email', err =>{
        if(err){
            return res.status(400).send('there was an error')
        }
    })
    
    res.send(user)
})

router.post('/:id', verifycation, async (req, res) =>{
    const id = req.params.id
    const user_id = req.user._id
    try {
        const server = await ServerModel.findById(id)
        if(!server){
            return res.status(404).send('invalid server')
        }

        const user = await UserModel.findById(user_id)

        
        const alredyExist =  user.serverList.find(UserServer => {
             return JSON.stringify(UserServer._id) === JSON.stringify(server._id)
        })

        if (alredyExist) {
            return res.send('you are on that server')
        }

        user.serverList.push({
            _id:server._id,
            name:server.name
        })

        await UserModel.findByIdAndUpdate(user._id, {
            serverList: user.serverList
        })
        server.users.push({
            name:user.name,
            _id:user._id,
            email:user.email
        })

        await ServerModel.findByIdAndUpdate(server._id, {
            users: server.users
        })
        
        res.send({id:server._id, name:sever.name})
    } catch (error) {
        res.send(error)   
    }
    
})


router.post('/', verifycation, async (req, res) =>{
    const user_id = req.user
    const serverName = req.body.serverName
    let user = await UserModel.findById(user_id)

    const resumendUser = {
        name:user.name,
        email:user.email
    }

    const sampleMessage = new MessageModel({
        content:'Welcome'
    })

    const sampleTextChannel = new TextChannelModel({
        name:'General',
        messages:[sampleMessage]
    })
    
    const server = new ServerModel({
        owner:resumendUser,
        name:serverName,
        textChannels:[sampleTextChannel],
        users:[resumendUser]
    })

    await server.save()
    
    user.serverList.push({_id:server._id, name:server.name})

    await UserModel.findOneAndUpdate({_id:user._id}, {serverList: user.serverList})

    res.send({_id:server._id, name:server.name})
})

router.get('/:channel_id',  verifycation, async (req,res) =>{
    const id = req.params.channel_id
    if(id === "me"){
        return res.send({me:true})
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).send({didHeMiss:true})
    }
    const server = await ServerModel.findOne({_id:id}, error =>{
        if(error){
            return res.status(404).send({didHeMiss:true})
        }
    })

    if(!server){
        return res.status(404)
    }
    
    res.send(server)
})

module.exports = router