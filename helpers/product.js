/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added GetOne(productId) method
30.08.2021        Ruchira Wishwajith        Created GET Method for Vendor

*/


function getForVendor(vendorId){
    return new Promise(async(resolve,reject)=>{
        try{
            let product = await productModel.Product.find({vendor:new productModel.mongoose.Types.ObjectId(vendorId)}).populate('images','imageUrl')

            if(!product)
                return reject({message:null,error:"Unable to find products for provided vendor",code:404,data:null})

            return resolve(products)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function getOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
        
            let product = await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(productId)}).populate('images','imageUrl')

            if(!product)
                return reject({message:null,error:"Unable to find product for provided product id",code:404,data:null})

            return resolve(product)

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}


