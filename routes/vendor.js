/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
30.08.2021        Deshani Rajapaksha        Created POST Method for Vendors.
*/


routes.post('/',jwtMiddleware,checkAdminPermissions,uploadMulter.array('logo', 1),(request, respond)=>{
    try{
        if(request.fileValidationError){
            return respond.status(200).send({success:false,message:request.fileValidationError,error:null,code:400,data:null})
        }

        let data = {
            name:request.body.name,
            country:request.body.country,
            logo:request.files[0].filename
        }

        if(!validator.validateEmptyFields(data.name,data.country))
            return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

        vendor.addNewVendor(data).then((products)=>{
            return respond.status(200).send({success:true,message:'Venfor successfully added',error:null,code:200,data:products})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
    }
})