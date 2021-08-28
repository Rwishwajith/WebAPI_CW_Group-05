//**************LOG HISTORY ***********************
//25.08.2021        Ruchira Wishwajith        Created.
//25.08.2021        Ruchira Wishwajith        Created Schema for Item-Pizza Cart


const mongoose = require('mongoose')

const itemincartSchema = new mongoose.Schema({
    cart:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    qty:
    {
        type:Number,
        default:0
    },
    createdAt:
    {
        type:Date,
        default:Date()
    },
    updatedAt: 
    {
        type:Date,
        default:Date()
    }
})

exports.itemincartSchema = itemincartSchema