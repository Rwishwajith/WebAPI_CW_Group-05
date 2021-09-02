
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for Product
//28.08.2021        Ruchira Wishwajith        Updated the MainCategory

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
    vendor: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vendor' 
    },
    masterCategory:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MainCategory' 
    },
    subCategory:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubCategory' 
    },
    images: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ProductImage'
    }],
    name: String,
    description: String,
    price: Number,
    discount: Number,
    isAvailable: Boolean,
    status: Boolean,
    createdAt: 
    {
        type:Date,
        default:Date()
    },
    updatedAt:
     {
        type:Date,
        default:Date()
    }
})

exports.productSchema = productSchema