const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ResumedUserSchema} =require('./ResumedUser')

const schema = new Schema({
    owner:ResumedUserSchema,
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    textChannels:{
        type:Array
    },
    voiceChannels:{
        type:Array
    },
    users:[ResumedUserSchema],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = {
    ServerSchema: schema,
    ServerModel :mongoose.model('Server', schema)
}