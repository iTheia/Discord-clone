const express = require('express')
const router = express.Router()
const {UserModel}= require('../Schemas/User')
const verifycation = require('./verifyToken')
const { TextChannelModel } = require('../Schemas/TextChannel')

router.post('/', verifycation, async (req,res)=>{
    const user_id =  req.user
    const requestedFriend = req.body.email
    
    const friend = await UserModel.findOne({email: requestedFriend})
    
    if(!friend){
        return res.status(400).send('there was an error')
    }

    const user = await UserModel.findOne({_id:user_id})
    let alredySended = friend.pendingRequest.find(friend =>friend._id == user_id._id)

    if(alredySended){
        return res.status(400).send({alredySended:'you alredy send a friend request'})
    }
    friend.pendingRequest.push({_id:user._id, name:user.name})

    await UserModel.findOneAndUpdate({_id:friend._id}, {pendingRequest: friend.pendingRequest})

    res.send('friendRequesSended')
})

router.get('/cancel/:id', verifycation, async (req,res)=>{
    const user_id =  req.user
    
    const user = await UserModel.findById(user_id._id)

    for (let index = 0; index < user.pendingRequest.length; index++) {
        const request = user.pendingRequest[index];
        
        if(JSON.stringify(request._id) === JSON.stringify(user._id)){
            user.pendingRequest.splice(index, 1)
        }
    } 

    await UserModel.findByIdAndUpdate(user._id, {
        pendingRequest: user.pendingRequest
    })

    res.send({id:user._id})
})

router.get('/:id', verifycation, async (req,res)=>{
    const user_id =  req.user
    const requestedFriend = req.params.id
    
    const friend = await UserModel.findById(requestedFriend)
    
    if(!friend){
        return res.status(400).send('there was an error')
    }
    const user = await UserModel.findById(user_id._id)

    for (let index = 0; index < user.pendingRequest.length; index++) {
        const request = user.pendingRequest[index];
        if(JSON.stringify(request._id) === JSON.stringify(friend._id)){
            user.pendingRequest.splice(index, 1)
        }
    } 
    const channel = new TextChannelModel({
        name: ' ',
        messages: []
    })
    await channel.save()
    user.friends.push({
        _id:friend._id,
        name:friend.name,
        slug: channel._id
    })

    await UserModel.findByIdAndUpdate(user._id, {
        pendingRequest: user.pendingRequest,
        friends: user.friends
    })
    friend.friends.push({
        _id:user._id,
        name:user.name,
        slug: channel._id
    })

    await UserModel.findByIdAndUpdate(friend._id, {
        friends: friend.friends
    })
    res.send({id:friend._id})
})
module.exports = router