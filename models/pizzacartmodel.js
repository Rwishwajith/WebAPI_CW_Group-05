/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Pizza Cart
*/

const mongoose = require('mongoose')

const pizzacartSchema = require('../schema/pizzacart').pizzacartSchema

const pizzacartmodel = mongoose.model('pizzacartmodel',pizzacartSchema)

exports.pizzacartmodel = pizzacartmodel

exports.mongoose = mongoose
