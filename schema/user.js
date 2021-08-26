
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for User

const mongoose = require('mongoose')
const hasher = require('../utils/hasher')

const userSchema = new mongoose.Schema({
    firebaseUid:String,
    email: {
        type: String,
        validate:{
            validator:(value)=>{
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
                return value.match(pattern)
            },
            message: "Incorrect email address"
        }
    },
    firstName: String,
    lastName: String,
    mobileNumber: {
        type:Number,
        required:false,
    },
    address: String,
    isSocial: Boolean,
    type: Number,
    status: {
        type:Boolean,
        default:false
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

exports.userSchema = userSchema


