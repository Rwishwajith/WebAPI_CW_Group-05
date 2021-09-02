/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Pizza Cart
*/

const mongoose = require('mongoose')

const cartSchema = require('../schema/cart').cartSchema

const Cart = mongoose.model('Cart',cartSchema)

exports.Cart = Cart

exports.mongoose = mongoose