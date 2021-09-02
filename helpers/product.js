/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Added GetOne(productId) method
30.08.2021        Ruchira Wishwajith        Created GET Method for Vendor
30.08.2021        Deshani Rajapaksha        Created a POST method for Add One Function.
31.08.2021        Sandaruwani Weerasinghe   Created get all method for product.
01.09.2021        Ruchira Wishwajith        Created Updateone(PUT) function
01.09.2021        Ruchira Wishwajith        Added relationships to models
01.09.2021        Pabasara Illangasekara    Added deleteall and deleteone methods
01.09.2021        Ruchira WIshwajith        Exported the methods
*/
const gcs = require('../services/gcs')
const productModel = require('../models/product')
const productImageModel = require('../models/productImage')
const gcsRef = new gcs.GCS()


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


function updateOne(data){
    return new Promise(async(resolve,reject)=>{
        try{
            let imageObj = []

            let product=await productModel.Product.findOne({_id:new productModel.mongoose.Types.ObjectId(data.productId)})

            if(!product)
                return reject({message:null,error:'Unable to find product',code:404,data:null})

            product.vendor=new productModel.mongoose.Types.ObjectId(data.vendorId),
            product.masterCategory=new productModel.mongoose.Types.ObjectId(data.masterCategoryId),
            product.subCategory=new productModel.mongoose.Types.ObjectId(data.subCategoryId),
            product.name=data.name,
            product.description=data.description,
            product.price=data.price,
            product.discount=data.discount,
            product.isAvailable=data.isAvailable,
            product.status=data.status

            let deletedImages = JSON.parse(data.deletedImages)

            console.log(deletedImages)
            console.log(data.images)

            await new Promise(async(resolve, reject) => {
                for(const deletedImage of deletedImages){
                    await productImageModel.ProductImage.deleteOne({_id:new productImageModel.mongoose.Types.ObjectId(deletedImage)})
                    if(product.images.length!=0){  
                        product.images = product.images.filter(image => image != deletedImage)
                    }
                }

                for(const image of data.images){
                    let downloadUrl = await gcsRef.uploadImage(image).catch((e)=>{})
                    let productImage = new productImageModel.ProductImage({
                        product:new productModel.mongoose.Types.ObjectId(product._id),
                        imageUrl:downloadUrl,
                    })
                    await productImage.save()

                    product.images.push(productImage)
                }
                return resolve(true)
            })

            product.save().then((res)=>{
                return resolve("Product successfully saved")
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
            await productModel.Product.deleteMany().then(res=>{
                productImageModel.ProductImage.deleteMany({product:new productModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                    return resolve(true)
                })
            }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function deleteOne(productId){
    return new Promise(async(resolve,reject)=>{
        try{
            await productModel.Product.deleteOne({_id:new productModel.mongoose.Types.ObjectId(productId)}).then(res=>{
                productImageModel.ProductImage.deleteMany({product:new productModel.mongoose.Types.ObjectId(res._id)}).then((res)=>{
                    return resolve(true)
                })
            }).catch((e)=>{return reject({message:"Unable to delete",error:e.message,code:500,data:null})})
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}
exports.getAll = getAll
exports.getOne = getOne
exports.addOne = addOne
exports.updateOne = updateOne
exports.deleteAll = deleteAll
exports.deleteOne = deleteOne
exports.getForVendor=getForVendor