/**************LOG HISTORY ***********************
26.08.2021        Ruchira Wishwajith        Created.
26.08.2021        Ruchira Wishwajith        Created Model for OTP
*/

const mongoose = require('mongoose')

const otpSchema = require('../schema/otp').otpSchema

exports.Otp = mongoose.model('Otp',otpSchema)

exports.mongoose = mongoose