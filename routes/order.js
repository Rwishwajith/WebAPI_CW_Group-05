/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Deshani Rajapaksha        Created POST Method to add Orders.
29.08.2021        Ruchira Wishwajith        Created GET method to retrive user's orders
29.08.2021        Ruchira Wishwajith        Created GET method to retrive orders
29.08.2021        Sandaruwani Weerasinghe   Created get method to retrive all orders
29.08.2021        Ruchia Wishwajith         Created PUT method to update orders
31.08.2021        Ruchira Wishwajith        Created Get method using ID
02.09.2021        Pabasara Illanagasekara   Added deleted methods
02.09.2021        Ruchira Wishwajith        Added relatonships to helper/middleware/utils
02.09.2021        Ruchira Wishwajith        Added retrun method and code refactoring
*/

const order = require('../helpers/order')
const jwtMiddleware = require('../middlewares/jwt').checkJWT
const checkAdminPermissions = require('../middlewares/permissionCheck').checkAdminPermissions
const validator = require('../utils/validators')

module.exports = (()=>{

    let routes = require('express').Router()
    routes.get('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            order.getAll().then((orders)=>{
                return respond.status(200).send({success:true,message:'Orders successfully fetched',error:null,code:200,data:orders})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.delete('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            order.deleteAll().then((result)=>{
                return respond.status(200).send({success:true,message:'All orders successfully deleted',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })



    routes.get('/user/',jwtMiddleware,(request, respond)=>{
        try{
            let userId = request.user.id

            order.getAllForUser(userId).then((orders)=>{
                return respond.status(200).send({success:true,message:'Orders successfully fetched',error:null,code:200,data:orders})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.get('/user/:orderId',jwtMiddleware,(request, respond)=>{
        try{
            let userId = request.user.id
            let orderId = request.params.orderId

            if(!validator.validateEmptyFields(orderId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            order.getOneForUser(userId,orderId).then((orders)=>{
                return respond.status(200).send({success:true,message:'Order successfully fetched',error:null,code:200,data:orders})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.get('/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let orderId = request.params.id

            if(!validator.validateEmptyFields(orderId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            order.getOne(orderId).then((order)=>{
                return respond.status(200).send({success:true,message:'Order successfully fetched',error:null,code:200,data:order})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })



    routes.post('/',jwtMiddleware,(request, respond)=>{
        try{
            let user=request.body.user
            let cart=request.body.cart
            let total=request.body.total
            let status=request.body.status

            if(!validator.validateEmptyFields(user,cart,total,status))
                return respond.status(200).send({success:false,message:'Please Fill all the required fields',error:null,code:400,data:null})

            let data={
                user:user,
                cart:cart,
                total:total,
                status:status
            }

            order.addOne(data).then((result)=>{
                return respond.status(200).send({success:true,message:'Order successfully added',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error is occoured!',error:e.message,code:500,data:null})
        }
    })

    routes.put('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{

            let orderId=request.body.order
            let status=request.body.status

            if(!validator.validateEmptyFields(orderId,status))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            let data={
                order:orderId,
                status:status
            }

            order.updateOne(data).then((result)=>{
                return respond.status(200).send({success:true,message:'Order successfully updated',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })
    routes.delete('/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            let orderId=request.params.id

            if(!validator.validateEmptyFields(orderId))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            order.deleteOne(orderId).then((result)=>{
                return respond.status(200).send({success:true,message:'Order successfully deleted',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    routes.delete('/',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
        try{
            order.deleteAll().then((result)=>{
                return respond.status(200).send({success:true,message:'All orders successfully deleted',error:null,code:200,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })

    return routes
})()