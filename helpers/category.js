/***************LOG HISTORY ***********************
28.08.2021        Ruchira Wishwajith        Created the file.
28.08.2021        Ruchira Wishwajith        Created the relationship with maincategory and subcategory.
29.08.2021        Sandaruwani Weerasinghe   Created get all method
30.08.2021        Deshani Rajapaksha        Created a POST method to add Main Category.
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

function addNewMainCategory(name){
    return new Promise(async(resolve,reject)=>{
        try{
            let isExist = await mainCategoryModel.MainCategory.count({name:name}) == 0?false:true

            if(isExist)
                return reject({message:"Category already exists",error:e.message,code:409,data:null})

            let masterCategory = new mainCategoryModel.MainCategory({
                name:name
            })

            mainCategory.save().then((res)=>{
                return resolve({mainCategoryId:mainCategory._id})
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}