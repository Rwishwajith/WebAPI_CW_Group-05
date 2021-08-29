/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Ruchira Wishwajith        Created OTP verification failed POST Method
*/

module.exports = (()=>{

    let routes = require('express').Router()

    routes.post('/issue',async(request, respond)=>{
        try{
            let contact = request.body.contact

            if(!validator.validateEmptyFields(contact))
                return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

            let contactType = await validator.validateContactType(contact)

            if(contactType.status===-1)
                return respond.status(200).send({success:false,message:'Provided contact is not valid',error:null,code:400,data:null})
            
            otp.issueAnOtp(contactType.data,contactType.status).then((result)=>{
                return respond.status(200).send({success:true,message:'OTP code successfully sent to '+contact,error:null,data:result})
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }catch(e){
            return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
        }
    })
