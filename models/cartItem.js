/*
*************LOG HISTORY ***********************
25.08.2021        Ruchira Wishwajith        Created.
25.08.2021        Ruchira Wishwajith        Created Model for Item-Pizza Cart
*/

const mongoose = require('mongoose')

const cartItemSchema = require('../schema/cartItem').cartItemSchema

const CartItem = mongoose.model('CartItem',cartItemSchema)

exports.CartItem = CartItem

exports.mongoose = mongoose