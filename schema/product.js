
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for Product
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
        ref: 'MasterCategory' 
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