//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Model for Pizza Cart

const mongoose = require("mongoose");

const pizzacartSchema = require('../schema/pizzacart').pizzacartSchema

const pizzacart = mongoose.model('PizzaCart',pizzacartSchema)

exports.pizzacart = pizzacart

exports.mongoose = mongoose
