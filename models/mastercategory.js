/**************LOG HISTORY ***********************
26.08.2021        Ruchira Wishwajith        Created.
26.08.2021        Ruchira Wishwajith        Created Model for main Category
*/

const mongoose = require('mongoose')

const masterCategorySchema = require('../schema/masterCategory').masterCategorySchema

const MasterCategory = mongoose.model('MasterCategory',masterCategorySchema)

exports.MasterCategory = MasterCategory

exports.mongoose = mongoose