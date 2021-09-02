/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Ruchira Wishwajith        Created GET Method
01.08.2021        Ruchira Wishwajith        Added relationship with gelpers,middlewares
*/

const dashboard = require('../helpers/dashboard')

const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions

module.exports = (()=>{

    let routes = require('express').Router()

    routes.get('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            dashboard.getAll().then((dashboardData)=>{
                return respond.status(200).send({success:true,message:'Dashboard data successfully fetched',error:null,code:200,data:dashboardData})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    return routes
})()