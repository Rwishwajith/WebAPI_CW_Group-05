/**************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created.
29.08.2021        Deshani Rajapaksha        Created POST Method for Login Request.
31.08.2021        Deshani Rajapaksha        Created POST Method for Register Request.
31.08.2021        Ruchira Wishwajith        Added the reuired auth and helpers
31.08.2021        Deshani Rajapaksha        Created POST Method for Forget Request.
*/

const login = require('../auth/login')
const register = require('../auth/register')
const forget = require('../auth/forget')

const otp = require('../helpers/otp')

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

routes.post('register',async(request, respond)={
    try{
        let data = {
            emailrequest.body.email,
            passwordrequest.body.password,
            passwordConfirmrequest.body.passwordConfirm,
            firstNamerequest.body.firstName,
            lastNamerequest.body.lastName,
            countryCoderequest.body.countryCode,
            mobileNumberrequest.body.mobileNumber,
            addressrequest.body.address,
            isSocialrequest.body.isSocial,
            type0
        }

        if(!validator.validateEmptyFields(data.email,data.password,data.passwordConfirm,data.firstName,data.lastName,data.address,data.isSocial,data.type))
            return respond.status(200).send({successfalse,message'Missing or empty required fields',error'Missing or empty required fields',code400,datanull})
        if(!validator.validateEmail(data.email))
            return respond.status(200).send({successfalse,message'Provided email is not valid',errornull,code400,datanull})

        let isMobileValid = null
        if(data.mobileNumber){
            await validator.validateMobileNumber(data.mobileNumber,data.countryCode).then((res)={
                isMobileValid=res
            }).catch((e)={
                isMobileValid=e
            })
            if(!isMobileValid.status)
                return respond.status(200).send({successfalse,messageisMobileValid.message,errorisMobileValid.error,codeisMobileValid.code,dataisMobileValid.data})
            else
                data.mobileNumber=isMobileValid.data
        }

        if(!validator.validateConfirmPassword(data.password,data.passwordConfirm))
            return respond.status(200).send({successfalse,message'Passwords not matching',errornull,code400,datanull})
        if(!validator.validatePassword(data.password))
            return respond.status(200).send({successfalse,message'Password mot matching security criteria',errornull,code400,datanull})
        
        register(data).then((result)={
            otp.issueAnOtp(data.email,0).then((result)={
                delete data[password]
                delete data[passwordConfirm]
                delete data[type]
                data[userId]=result.userId

                return respond.status(200).send({successtrue,message'User successfully registered and an OTP code sent to the user email',errornull,code200,datadata})
            }).catch((e)={
                return respond.status(200).send({successfalse,messagee.message,errore.error,codee.code,datae.data})
            })
        }).catch((e)={
            return respond.status(200).send({successfalse,messagee.message,errore.error,codee.code,datae.data})
        })
    }catch(e){
        return respond.status(500).send({successfalse,message'Unexpected error occurs',errore.message,code500,datanull})
    }
})

routes.post('/forget',(request, respond)=>{
    try{
        let otpId = request.body.otpId
        let password = request.body.password
        let passwordConfirm = request.body.passwordConfirm

        if(!validator.validateEmptyFields(otpId,password,passwordConfirm))
            return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})
            
        if(!validator.validateConfirmPassword(password,passwordConfirm))
            return respond.status(200).send({success:false,message:'Passwords not matching',error:null,code:400,data:null})

        if(!validator.validatePassword(password))
            return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,code:400,data:null})

        forget(otpId,password).then((result)=>{
            return respond.status(200).send({success:true,message:'Password successfully changed',error:null,code:200,data:result})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
    }
})

routes.post('/register/admin',jwtMiddleware,checkAdminPermissions,(request, respond)=>{
    try{

        let data = {
            email:request.body.email,
            password:request.body.password,
            passwordConfirm:request.body.passwordConfirm,
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            countryCode:request.body.countryCode,
            mobileNumber:request.body.mobileNumber,
            address:request.body.address,
            isSocial:request.body.isSocial,
            type:1
        }

        if(!validator.validateEmptyFields(data.email,data.password,data.passwordConfirm,data.firstName,data.lastName,data.address,data.isSocial))
            return respond.status(200).send({success:false,message:'Missing or empty required fields',error:null,code:400,data:null})

        if(!validator.validateEmail(data.email))
            return respond.status(200).send({success:false,message:'Provided email is not valid',error:null,code:400,data:null})

        if(data.mobileNumber){
            validator.validateMobileNumber(data.mobileNumber,data.countryCode).then((res)=>{
                data.mobileNumber=res.data
            }).catch((e)=>{
                return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
            })
        }
        
        if(!validator.validateConfirmPassword(data.password,data.passwordConfirm))
            return respond.status(200).send({success:false,message:'Passwords not matching',error:null,code:400,data:null})

        if(!validator.validatePassword(data.password))
            return respond.status(200).send({success:false,message:'Password mot matching security criteria',error:null,code:400,data:null})
        
        register(data).then((result)=>{
            return respond.status(200).send({success:true,message:'Admin user successfully registered',error:null,code:200,data:data})
        }).catch((e)=>{
            return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:e.data})
        })
    }catch(e){
        return respond.status(500).send({success:false,message:'Unexpected error occurs',error:e.message,code:500,data:null})
    }
})