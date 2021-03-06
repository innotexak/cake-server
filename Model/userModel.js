const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Token:{
        type:String,
        required:false
    },
    profilePic:{
        type:String,
        required:false
    },
}, {timestamps:true})

const User = mongoose.model("cake-users", userSchema)

module.exports = User