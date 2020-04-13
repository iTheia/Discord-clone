const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {UserSchema} =require('./User')
const {ResumedUserSchema} =require('./ResumedUser')
const {TextChannelSchema} =require('./TextChannel')

const schema = new Schema({
    owner:ResumedUserSchema,
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    textChannels:[TextChannelSchema],
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