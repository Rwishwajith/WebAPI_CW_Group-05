
/**************LOG HISTORY ***********************
24.08.2021        Ruchira Wishwajith        Created.
24.08.2021        Ruchira Wishwajith        Created Model for Sub Category
*/

const mongoose = require('mongoose')

const subCategorySchema = require('../schema/subCategory').subCategorySchema

const SubCategory = mongoose.model('SubCategory',subCategorySchema)

exports.SubCategory = SubCategory

exports.mongoose = mongoose