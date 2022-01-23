const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    cakeName:{
        type:String,
        required:true
    },
    cakeColors:{
        type:Object,
        required:true
    },
    cakeSize:{
        type:String,
        required:true
    },
    cakePrize:{
        type:String,
        required:true
    },
    status:{
        type:String,
        reuqired:true
    },
    deliveryDate:{
        type:String,
        required:true
    },


}, {timestamps:true})

const OrderedCake = mongoose.model('CakeOrdered',orderSchema)

module.exports = OrderedCake