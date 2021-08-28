/**************LOG HISTORY ***********************
28.08.2021       Sandaruwani Weerasinghe       Created.
28.08.2021       Sandaruwani Weerasinghe       Create authentication for Login Users.
28.08.2021       Ruchira Wishwajith            Created the relationships with models, utils and services and helpers
*/

const otp = require('../helpers/otp')

const userModel = require('../models/user')

const jwt = require('../utils/jwt')

const auth = require('../services/firebase').getAuth()

module.exports=((email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            auth.signInWithEmailAndPassword(email,password).then(async()=>{
                let user = await userModel.User.findOne({email:email})
                if(user.status===false){
                    otp.issueAnOtp(user.email,0).then((result)=>{
                        return reject({message:"Account not verified",error:'User account not activate yet. Please verify your email address. Email verification code sent to your email address. OTP code sent',code:503,data:{userId:user._id}})
                    }).catch((e)=>{
                        return respond.status(200).send({success:false,message:e.message,error:e.error,code:e.code,data:null})
                    })
                }else{
                    let payload = jwt.makePayloadWithUser(user)
                    return resolve({'accessToken':jwt.generateJWT(payload)})
                }
            }).catch((e)=>{
                return reject({message:'Your Account does not exist. Please try again with a new email',error:e.message,code:401,data:null})
            })
        }catch(e){
            return reject({message:"Unidenfied error! Please try again later",error:e.message,code:500,data:null})
        }
    })
})