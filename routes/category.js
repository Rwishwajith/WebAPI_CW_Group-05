/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Ruchira Wishwajith        Created GET Method to fecth categories
31.08.2021        Deshani Rajapaksha        Created a POST Method for MasterCategory
01.09.2021        Deshani Rajapaksha        Created a POST Method for SubCategory.
02.09.2021        Ruchira Wishwajith        Added relationships with helpers,middlewares/utils
02.08.2021        Ruchira Wishwajith        Added return method and code refactoring
*/
const category = require('../helpers/category')
const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions
const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/',(request, respond)=>{
        try{
            category.getAll().then((categories)=>{
                return respond.status(200).send({success:true,message:'categories successfully fetched',error:null,code:200,data:categories})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/masterCategory',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let name = request.body.name

            if(!validator.validateEmptyFields(name))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            category.addNewMasterCategory(name).then((products)=>{
                return respond.status(200).send({success:true,message:'Master category successfully added',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.post('/subCategory',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
            try{
                let masterCategoryId = request.body.masterCategoryId
                let name = request.body.name

                if(!validator.validateEmptyFields(masterCategoryId,name))
                    return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

                category.addNewSubCategory(masterCategoryId,name).then((products)=>{
                    return respond.status(200).send({success:true,message:'Sub category successfully added',error:null,code:200,data:products})
                }).catch((e)=>{
                    return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
                })
            }
            catch(e){
                return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
            }
    })
    

    routes.delete('/subCategory/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let subCategoryId = request.params.id

            if(!validator.validateEmptyFields(subCategoryId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            category.deleteSubCategory(subCategoryId).then((products)=>{
                return respond.status(200).send({success:true,message:'Sub category successfully deleted',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })

    routes.delete('/masterCategory/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let masterCategoryId = request.params.id

            if(!validator.validateEmptyFields(masterCategoryId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

            category.deleteMasterCategory(masterCategoryId).then((products)=>{
                return respond.status(200).send({success:true,message:'Master category & Sub categoris successfully deleted',error:null,code:200,data:products})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
        }
    })


    return routes
})()