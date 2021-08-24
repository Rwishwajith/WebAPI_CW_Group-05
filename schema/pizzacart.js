//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Schema for Pizza Cart

const mongoose = require('mongoose')

const pizzacartSchema = new.mongoose.Schema({
    orders:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Order'
    },

    products:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    CreationDate:
    {
        type: Date,
        default: Date()
    },

    updatedDate:
    {
        type: Date,
        default: Date()

    }

})

exports.pizzacartSchema = pizzacartSchema