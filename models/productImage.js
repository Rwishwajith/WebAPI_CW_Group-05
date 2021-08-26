
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Model for Product Image


const mongoose = require('mongoose')

const productImageSchema = require('../schema/productImage').productImageSchema

const ProductImage = mongoose.model('ProductImage',productImageSchema)

exports.ProductImage = ProductImage

exports.mongoose = mongoose