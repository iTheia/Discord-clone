const express = require('express')
const router = express.Router()
const verifycation = require('./verifyToken')
const { ServerModel } = require('../Schemas/Server')
const { UserModel } = require('../Schemas/User')
const { TextChannelModel } = require('../Schemas/TextChannel')

router.get('/', verifycation,  (req,res) =>{
    res.send([
        {
            _id: '5e8bbe489f2910120c9714d0',
            name:"test 1"
        },
        {
            _id:'5e8bbc24fe459b100ca2ec11',
            name:"test 2"
        }
    ])
})

router.post('/', verifycation, async (req, res) =>{
    const user_id = req.body._id
    const serverName = req.body.serverName
    const user = await UserModel.findOne({user_id})
    const owner = {
        name:user.name,
        email:user.email,
        date:user.date
    }
    const sampleTextChannel = new TextChannelModel({
        name:'General',
        messages:[]
    })
    const server = new ServerModel({
        owner:owner,
        name:serverName,
        textChannels:[sampleTextChannel],
        users:[owner]
    })
    await server.save( error =>{
        if(error){
            return res.send('there was and error')
        }
    })
    res.send('')
})
router.get('/:channel_id',  verifycation, async (req,res) =>{
    const server = await ServerModel.findOne({_id:req.params.channel_id})
    if(!server){
        return res.status(404)
    }
    
    res.send(server)
})

module.exports = router