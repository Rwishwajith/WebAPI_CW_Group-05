/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Orders
*/

const mongoose = require('mongoose')

const orderSchema = require('../schema/order').orderSchema

const Order = mongoose.model('Order',orderSchema)

exports.Order = Order

exports.mongoose = mongoose