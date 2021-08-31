/***************LOG HISTORY ***********************
28.08.2021        Ruchira Wishwajith        Created the file.
28.08.2021        Ruchira Wishwajith        Created the relationship with maincategory and subcategory.
29.08.2021        Sandaruwani Weerasinghe   Created get all method
30.08.2021        Deshani Rajapaksha        Created a POST method to add Main Category.
30.08.2021        Deshani Rajapaksha        Created a POST method to add Sub Category.
30.08.2021        Ruchira Wishwajith        Renamed function addNewMainCategory ----> addNewMasterCategory
31.08.2021        Ruchira Wishwajith        Export functions
01.08.2021        Pabasara Illangasekara    Added Delete Sub Category
01.08.2021        Pabasara Illangasekara    Added Delete Master Category
*/

const mastercategoryModel = require('../models/mastercategory')

const subCategoryModel = require('../models/subCategory')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let categories = await mastercategoryModel.MasterCategory.find().populate('subCategory').lean()

            categories['child']=categories['subCategory']
            delete categories['subCategory']
            resolve(categories)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewMasterCategory(name){
    return new Promise(async(resolve,reject)=>{
        try{
            let isExist = await masterCategoryModel.MasterCategory.count({name:name}) == 0?false:true

            if(isExist)
                return reject({message:"Category already exists",error:e.message,code:409,data:null})

            let masterCategory = new masterCategoryModel.MainCategory({
                name:name
            })

            masterCategory.save().then((res)=>{
                return resolve({masterCategoryId:masterCategory._id})
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addNewSubCategory(masterCategoryId,SubCategoryName){
    return new Promise(async(resolve,reject)=>{
        try{
            let masterCategory = await masterCategoryModel.MasterCategory.findOne({_id:new masterCategoryModel.mongoose.Types.ObjectId(masterCategoryId)})

            if(!masterCategory)
                return reject({message:null,error:"Invalid master category ID",code:404,data:null})

            let isExist = await subCategoryModel.SubCategory.count({name:SubCategoryName}) == 0?false:true

            if(isExist)
                return reject({message:"Category already exists",error:null,code:409,data:null})

            let subCategory = new subCategoryModel.SubCategory({
                masterCategoryId:masterCategory._id,
                name:SubCategoryName
            })

            subCategory.save().then((res)=>{
                masterCategory.subCategory.push(subCategory._id)
                masterCategory.save().then((res)=>{
                    return resolve({subCategoryId:subCategory._id})
                }).catch((e)=>{
                    return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
                })
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}
function deleteSubCategory(subCategoryId){
    return new Promise(async(resolve,reject)=>{
        try{
            let subCategory = await subCategoryModel.SubCategory.deleteOne({_id:new subCategoryModel.mongoose.Types.ObjectId(subCategoryId)})

            if(!subCategory)
                return reject({message:null,error:"Invalid sub category ID",code:404,data:null})

            return resolve(subCategoryId)
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}



function deleteMasterCategory(masterCategoryId){
    return new Promise(async(resolve,reject)=>{
        try{
            await masterCategoryModel.MasterCategory.deleteOne({_id:new masterCategoryModel.mongoose.Types.ObjectId(masterCategoryId)}).catch((e)=>{
                reject({message:"Unable to delete master category",error:e.message,code:500,data:null})
            })

            await subCategoryModel.SubCategory.deleteMany({masterCategoryId:masterCategoryId}).catch((e)=>{
                return reject({message:"Unable to delete sub category",error:e.message,code:500,data:null})
            })

            return resolve(masterCategoryId)
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}


exports.getAll = getAll
exports.addNewMasterCategory = addNewMasterCategory
exports.addNewSubCategory = addNewSubCategory
