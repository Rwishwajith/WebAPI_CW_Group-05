//**************LOG HISTORY ***********************
//26.08.2021        Ruchira Wishwajith        Created.
//26.08.2021        Ruchira Wishwajith        Created Schema for main Category


const mongoose = require('mongoose')

const mainCategorySchema = new mongoose.Schema({
    name:{
        type:String
    },
    subCategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default:[]
    }],
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.mainCategorySchema = mainCategorySchema