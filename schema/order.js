//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Schema for Orders

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    cart: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart' 
    },
    total: Number,
    status: {
        type:Number,
        default:0
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.orderSchema = orderSchema