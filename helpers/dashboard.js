/***************LOG HISTORY ***********************
28.08.2021        Ruchira Wishwajith        Created the file.
28.08.2021        Ruchira Wishwajith        Created relationships with user,product, order and vendor models
31.08.2021        Sandaruwani Weerasinghe   Created get method for dashboard
*/


const userModel = require('../models/user')
const productModel = require('../models/product')
const orderModel = require('../models/order')
const vendorModel = require('../models/vendor')

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let vendorCount = await vendorModel.Vendor.countDocuments()
            let userAdminCount = await userModel.User.countDocuments({type:1})
            let userCount = await userModel.User.countDocuments({type:0})
            let productCount = await productModel.Product.countDocuments()
            let orderCount = await orderModel.Order.countDocuments()
            let orderPendingCount = await orderModel.Order.countDocuments({status:0})
            let orderAcceptCount = await orderModel.Order.countDocuments({status:1})
 

            let data = {
                vendorCount:vendorCount,
                userAdminCount:userAdminCount,
                userCount:userCount,
                productCount:productCount,
                orderCount:orderCount,
                orderPendingCount:orderPendingCount,
                orderAcceptCount:orderAcceptCount,
           
            }

            resolve(data)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}