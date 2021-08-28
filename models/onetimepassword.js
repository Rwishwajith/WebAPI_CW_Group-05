/**************LOG HISTORY ***********************
26.08.2021        Ruchira Wishwajith        Created.
26.08.2021        Ruchira Wishwajith        Created Model for OTP
*/

const mongoose = require('mongoose')

const onetimepasswordSchema = require('../schema/onetimepassword').onetimepasswordSchema

exports.onetimepasswordSchema = mongoose.model('OneTimePassword',onetimepasswordSchema)

exports.mongoose = mongoose