const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    }
})

module.exports = {
    ResumedUserModel: mongoose.model('ResumedUser', schema),
    ResumedUserSchema: schema
}