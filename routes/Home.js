const express = require('express')
const router = express.Router()
const verifycation = require('./verifyToken')
const {ServerModel} = require('../Schemas/Server')

router.get('/server', verifycation,  (req,res) =>{
    
    res.send([
        {
            _id: 1,
            name:"test 1"
        },
        {
            _id:2,
            name:"test 2"
        }
    ])
})
router.get('/server/:channel_id', verifycation, async (req,res) =>{
    const server = await ServerModel.findOne({_id:req.params.channel_id})
    if(!server){
        return res.status(404)
    }
    console.log(server)
    res.send(req.params.channel_id)
})


module.exports = router