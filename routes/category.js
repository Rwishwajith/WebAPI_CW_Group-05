/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Ruchira Wishwajith        Created GET Method to fecth categories
*/


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