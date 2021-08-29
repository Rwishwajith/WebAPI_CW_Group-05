/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Deshani Rajapaksha        Created POST Method to add Orders.
*/

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