/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added function getallforusers(UserID)
29.08.2021        Ruchira Wishwajith        Added function to GetAll()
30.08.2021        Ruchira Wishwajith        Added function to getOneForUser(userId,orderId)
30.08.2021        Ruchira Wishwajith        Added function to  getOne(orderId)
30.08.2021        Deshani Rajapaksha        Added function to  addOne(data)updateOne(data)
30.08.2021        Ruchira Wishwajith        Added function to updateOne(data)
30.08.2021        Ruchira Wishwajith        Code Refctoring
31.08.2021        Ruchira Wishwajith        Exported the functions
01.09.2021        Pabasara Illangasekara    Added Delete All Method
01.09.2021        Pabasara Illangasekara    Added Delete One Method
01.09.2021        Ruchira Wishwajith        Added exporte exports.deleteAll = deleteAll and exports.deleteOne = deleteOne 
01.09.2021        Ruchira Wishwajith        Added missing export method DeleteAll
*/
const orderModel = require('../models/order')
const cartModel = require('../models/cart')
const cartItemModel = require('../models/cartItem')
const userModel = require('../models/user')
const productModel = require('../models/product')

const email = require('../services/email')

const ORDERSTATUS = {
    0:"Pending",
    1:"Accept",
    2:"Proccessing",
    3:"Shipped",
    4:"Complete"
}

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find().populate([{
                path: 'user',
                model: 'User'
            }, {
                path: 'cart',
                model: 'Cart',
                populate: {
                    path: 'items',
                    model: 'CartItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'images',
                            model: 'ProductImage'
                        },
                    },
                },
            }])
            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getAllForUser(userId){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find({user:new orderModel.mongoose.Types.ObjectId(userId)}).populate([{
                path: 'user',
                model: 'User'
            }, {
                path: 'cart',
                model: 'Cart',
                populate: {
                    path: 'items',
                    model: 'CartItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'images',
                            model: 'ProductImage'
                        },
                    },
                },
            }])
            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOneForUser(userId,orderId){
    return new Promise(async(resolve,reject)=>{
        try{
            let orders = await orderModel.Order.find({_id:new orderModel.mongoose.Types.ObjectId(orderId),user:new orderModel.mongoose.Types.ObjectId(userId)}).populate('user','cart')

            return resolve(orders)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOne(orderId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let order = await orderModel.Order.findOne({_id:new orderModel.mongoose.Types.ObjectId(orderId)}).populate('user','cart')

            if(!order)
                return reject({message:null,error:"Unable to find order for provided order id",code:404,data:null})

            return resolve(product)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let userData = await userModel.User.findOne({_id:data.user})
            
            if(!userData)
                return reject({message:"Unable to get user data",error:null,code:404,data:null})

            let order=new orderModel.Order({
                user:new orderModel.mongoose.Types.ObjectId(data.user),
                total:data.total,
                status:data.status
            })

            let cart = new cartModel.Cart({
                order:new orderModel.mongoose.Types.ObjectId(order._id),
                items:[]
            })

            new Promise(async(resolve, reject) => {
                for(const cartProductData of data.cart){
                    let cartItemData = new cartItemModel.CartItem({
                        cart: new cartModel.mongoose.Types.ObjectId(cart._id),
                        product:new productModel.mongoose.Types.ObjectId(cartProductData.productId),
                        qty:cartProductData.qty,
                    })
                    await cartItemData.save()
                    cart.items.push(cartItemData._id)
                }
                return resolve(true)
            }).then(()=>{
                cart.save().then((res)=>{
                    order.cart=new cartModel.mongoose.Types.ObjectId(cart._id)
                    order.save().then((res)=>{
                        email.sendEmail(userData.email,"Order Placed",`Your order is successfully placed. Order ID is ${order.id}`).then(()=>{
                            return resolve("Order successfully saved")
                        }).catch((e)=>{
                            return reject({message:"Unable to send email",error:e.message,code:424,data:null})
                        })
                    }).catch((e)=>{
                        return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
                    })
                })
            }).catch((e)=>{
                return reject({message:"Unable to add cart item data",error:e.message,code:400,data:null})
            })
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function updateOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let order = await orderModel.Order.findOne({_id:new orderModel.mongoose.Types.ObjectId(data.order)})

            if(!order)
                return reject({message:null,error:'Unable to find order',code:404,data:null})

            let userData = await userModel.User.findOne({_id:order.user})

            if(!userData)
                return reject({message:null,error:'Unable to find user data',code:404,data:null})

            order.status=data.status

            order.save().then((res)=>{
                email.sendEmail(userData.email,"Order Placed",`Your order is now on ${ORDERSTATUS[data.status]} state. Thank you.`).then(()=>{
                    return resolve("Order successfully saved")
                }).catch((e)=>{
                    return reject({message:"Unable to send email",error:e.message,code:424,data:null})
                })
            }).catch((e)=>{
                return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
            })
            
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500})
        }
    })
}
function deleteAll(){
    return new Promise(async(resolve,reject)=>{
    try{
    orderModel.Order.deleteMany().then(res=>{
    cartModel.Cart.deleteMany({order:new orderModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
    cartItemModel.CartItem.deleteMany({cart:new cartModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
    return resolve(true)
    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
    }catch(e){
    return reject({message:"Undetected error",error:e.message,code:500,data:null})
    }
    })
    }

function deleteOne(orderId){
    return new Promise(async(resolve,reject)=>{
        try{
            orderModel.Order.deleteOne({_id:new orderModel.mongoose.Types.ObjectId(orderId)}).then(res=>{
                cartModel.Cart.deleteOne({order:new orderModel.mongoose.Types.ObjectId(orderId)}).then((res)=>{
                    cartItemModel.CartItem.deleteMany({cart:new cartModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                        return resolve(true)
                    }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
                }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
            }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}
    

exports.getAll = getAll
exports.getAllForUser=getAllForUser
exports.getOneForUser=getOneForUser
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.deleteOne = deleteOne
exports.deleteAll = deleteAll
