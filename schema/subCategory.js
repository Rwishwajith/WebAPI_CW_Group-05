
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for Sub Category
//28.08.2021        Ruchira Wishwajith        Updated the referance for MainCategory
//28.08.2021        Ruchira Wishwajith        Added mongoose.model

const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    masterCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MainCategory'
    },
    name:{
        type:String
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
},{ strict: false })

exports.subCategorySchema = subCategorySchema