/**************LOG HISTORY ***********************
28.08.2021       Sandaruwani Weerasinghe       Created.
28.08.2021       Sandaruwani Weerasinghe       Create authentication for forget password.
28.08.2021       Ruchira Wishwajith            Created the relationships with models, utils and services
*/

const otpModel = require('../models/otp')
const userModel = require('../models/user')

const adminAuth = require('../services/firebase').getAdminAuth()

const jwt = require('../utils/jwt')

module.exports=((otpId,rawPassword)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            let otpDetails = await otpModel.Otp.findOne({uuid:otpId,isActive:true})

            if(!otpDetails)
                return reject({message:null,error:"Invalid OTP",code:401,data:null})
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(otpDetails.user)})

            otpDetails.isActive=false

            adminAuth.updateUser(user.firebaseUid,{password:rawPassword}).then(()=>{
                otpDetails.save().then((res)=>{

                    let payload = jwt.makePayloadWithUser(otpDetails.user)
                    return resolve({'accessToken':jwt.generateJWT(payload)})

                }).catch((e)=>{return reject({message:"Unable to connect to Database",error:e.message,code:500,data:null})})
            }).catch((e)=>{return reject({message:"Unable change your password",error:e.message,code:500,data:null})})

        }catch(e){
            return reject({message:"Unidenfied error! Please try again later",error:e.message,code:500,data:null})
        }
    })
})