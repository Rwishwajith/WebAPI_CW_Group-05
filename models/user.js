
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Model for User

const mongoose = require('mongoose')

const userSchema = require('../schema/user').userSchema

exports.User = mongoose.model('User',userSchema)

exports.mongoose = mongoose