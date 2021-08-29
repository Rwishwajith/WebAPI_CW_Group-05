/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added function getallforusers(UserID)
*/



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