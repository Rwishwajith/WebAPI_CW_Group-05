/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Orders
*/

const mongoose = require('mongoose')

const ordersSchema = require('../schema/orders').ordersSchema

const Orders = mongoose.model('Orders',ordersSchema)

exports.Orders = Orders

exports.mongoose = mongoose