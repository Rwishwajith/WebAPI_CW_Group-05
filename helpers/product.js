/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added GetOne(productId) method
30.08.2021        Ruchira Wishwajith        Created GET Method for Vendor
30.08.2021        Deshani Rajapaksha        Created a POST method for Add One Function.
31.08.2021        Sandaruwani Weerasinghe   Created get all method for product.
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

function getAll(params=undefined){
    return new Promise(async(resolve,reject)=>{
        try{
            let query = {}
            let keywordFilter = {}

            if(params){
                let filters = {$or:[]}
                for (const [key, value] of Object.entries(params)) {
                    if(key==="keyword" && value!='""' && value!="undefined" && value!='"undefined"'){
                        keywordFilter={ $text: { $search: value } }
                    }
                    if(key!="keyword"){
                        filter = {}
                        filter[key]=value 
                        filters['$or'].push(filter)
                    }
                }
                query=filters['$or'].length===0?{}:filters
            }

            let products = await productModel.Product.find({$and:[query,keywordFilter]}).populate('images','imageUrl')

            return resolve(products)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function addOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let isProductExists = await productModel.Product.count({name:data.name})
            if(isProductExists!=0)
                return reject({message:null,error:"Product already exists",code:409,data:null})

            let imageObj = []

            let product=new productModel.Product({
                vendor:new productModel.mongoose.Types.ObjectId(data.vendorId),
                masterCategory:new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
                subCategory:new productModel.mongoose.Types.ObjectId(data.subCategoryId),
                name:data.name,
                description:data.description,
                price:data.price,
                discount:data.discount,
                isAvailable:data.isAvailable,
                status:data.status
            })

            await new Promise(async(resolve, reject) => {
                for(const image of data.images){
                    let downloadUrl = await gcsRef.uploadImage(image).catch((e)=>{})
                    let productImage = new productImageModel.ProductImage({
                        product:product._id,
                        imageUrl:downloadUrl,
                    })
                    await productImage.save()

                    imageObj.push(productImage)
                }
                return resolve(true)
            })

            product.images = imageObj

            product.save().then((res)=>{
                return resolve("Product successfully saved")
            }).catch((e)=>{
                return reject({message:"Unable to save to database",error:e.message,code:500,data:null})
            })

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}
