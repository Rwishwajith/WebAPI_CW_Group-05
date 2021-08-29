/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added GetOne(productId) method

*/



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


