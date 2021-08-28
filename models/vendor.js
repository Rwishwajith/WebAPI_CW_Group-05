
/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Sub Category
*/

const mongoose = require('mongoose')

const vendorSchema = require('../schema/vendor').vendorSchema

exports.Vendor = mongoose.model('Vendor',vendorSchema)

exports.mongoose = mongoose