/**************LOG HISTORY ***********************
26.08.2021        Ruchira Wishwajith        Created.
26.08.2021        Ruchira Wishwajith        Created Model for main Category
*/

const mongoose = require('mongoose')

const mainCategorySchema = require('../schema/maincategory').mainCategorySchema

const MainCategory = mongoose.model('MainCategory',mainCategorySchema)

exports.MainCategory = MainCategory

exports.mongoose = mongoose