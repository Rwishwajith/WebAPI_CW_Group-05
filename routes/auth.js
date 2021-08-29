/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Deshani Rajapaksha        Created POST Method for Login Request.
*/

routes.post('/login',(request, respond)=>{
    try{
        let email = request.body.email
        let password = request.body.password

        if(!validator.validateEmptyFields(email,password))
            return respond.status(200).send({success:false,message:'Missing or empty required fields',error:'Missing or empty required fields',code:400,data:null})

        login(email,password).then((result)=>{
            return respond.status(200).send({success:true,message:'Successfully authenticated',error:null,code:200,data:result})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
    }
})