
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for Vendor

const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: String,
    country: String,
    logo: {
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/webapi-group05.appspot.com/o/a.JPG?alt=media&token=41079763-b0da-493b-a857-e1a71abdd4de"
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

exports.vendorSchema = vendorSchema