/***************LOG HISTORY ***********************
28.08.2021        Ruchira Wishwajith        Created the file.
28.08.2021        Ruchira Wishwajith        Created the relationship with maincategory and subcategory.
29.08.2021        Sandaruwani Weerasinghe   Created get all method
*/

const maincategoryModel = require('../models/maincategory')

const subCategoryModel = require('../models/subCategory')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let categories = await maincategoryModel.MainCategory.find().populate('subCategory').lean()

            categories['child']=categories['subCategory']
            delete categories['subCategory']
            resolve(categories)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

