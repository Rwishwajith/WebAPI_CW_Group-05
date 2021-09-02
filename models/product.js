/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Product
28.08.2021        Ruchira Wishwajith        Added mongoose.model
*/

const mongoose = require("mongoose");

const productSchema = require('../schema/product').productSchema

const Product = mongoose.model('Product',productSchema)

exports.Product = Product

exports.mongoose = mongoose