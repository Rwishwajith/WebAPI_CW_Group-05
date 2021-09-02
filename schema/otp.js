//**************LOG HISTORY ***********************
//26.08.2021        Ruchira Wishwajith        Created.
//26.08.2021        Ruchira Wishwajith        Created Scehma for OTP

const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    uuid: {
        type:String,
        default:null
    },
    code: Number,
    isVerified: {
        type:Boolean,
        default:false
    },
    isActive: {
        type:Boolean,
        default:false
    },
    sentTo:Number,
    createdAt: {
        type:Date,
        default:new Date()
    },
    updatedAt: {
        type:Date,
        default:new Date()
    }
})

exports.otpSchema = otpSchema