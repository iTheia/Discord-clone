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
    },
    password:{
        type:String,
        min:6,
        max:1024
    },
    friends:{
        type:Array,
        default:[]
    },
    joinedServers:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = {
    UserModel: mongoose.model('User', schema),
    UserSchema: schema
}