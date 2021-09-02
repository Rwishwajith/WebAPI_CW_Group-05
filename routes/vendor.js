/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
30.08.2021        Deshani Rajapaksha        Created POST Method for Vendors.
31.08.2021        Sandaruwani Weerasinghe   Create get method for vendors
*/

routes.get('/',(request, respond)=>{
    try{
        vendor.getAll().then((vendors)=>{
            return respond.status(200).send({success:true,message:'Vendors successfully fetched',error:null,code:200,data:vendors})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
    }
})

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
routes.delete('/:id',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
    try{
        let vendorId = request.params.id

        if(!validator.validateEmptyFields(vendorId))
            return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,data:null})

        vendor.deleteVendor(vendorId).then((products)=>{
            return respond.status(200).send({success:true,message:'Vendor successfully deleted',error:null,code:200,data:products})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,data:null})
    }
})
