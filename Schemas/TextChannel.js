const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {MessageSchema} =require('./Message')

const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    messages:[MessageSchema]
})

module.exports = {
    TextChannelModel: mongoose.model('TextChannel', schema),
    TextChannelSchema : schema
}