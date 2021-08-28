/*
*************LOG HISTORY ***********************
25.08.2021        Ruchira Wishwajith        Created.
25.08.2021        Ruchira Wishwajith        Created Model for Item-Pizza Cart
*/

const mongoose = require('mongoose')

const itemincartSchema = require('../schema/itemincart').itemincartSchema

const itemincart = mongoose.model('itemincart',itemincartSchema)

exports.itemincart = itemincart

exports.mongoose = mongoose