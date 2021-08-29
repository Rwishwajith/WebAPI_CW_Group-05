/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
29.08.2021        Ruchira Wishwajith        Installed timediff and moment npm packages
29.08.2021        Ruchira Wishwajith        Created the relationship with maincategory and subcategory.
*/

const codeGenerator = require('../utils/codeGenerator')
const time = require('../utils/time')

const sms = require('../services/sms')
const email = require('../services/email')

const userModel = require('../models/user')
const otpModel = require('../models/otp')

const moment = require('moment')

function issueAnOtp(contact,contactType){
    return new Promise(async(resolve,reject)=>{
        try{
            if(contactType){
                var user = await userModel.User.findOne({mobileNumber:contact})
            }else{
                var user = await userModel.User.findOne({email:contact})
            }

            if(!user)
                return reject({message:null,error:"Contact information is not match with any of our users",code:404,data:null})
    
            let code = codeGenerator.generateOtp()

            let createdAt = moment(new Date()).add(2, 'm').toDate()
    
            let otpDetails = new otpModel.Otp({user:user,code:code,sentTo:contactType,createdAt:createdAt})
    
            let messageContent = "Please use below OTP to reset your password. \n "+code.toString()
    
            if(contactType===1){
                await sms.sendSms(contact,messageContent).catch((e)=>{
                    return reject({message:"Unable to send sms",error:e.message,code:424,data:null})
                })
            }else{
                await email.sendEmail(contact,"Verify OTP",messageContent).catch((e)=>{
                    return reject({message:"Unable to send email",error:e.message,code:424,data:null})
                })
            }
    
            otpDetails.save().then((res)=>{
                let data = {
                    userId:user._id
                }
        
                return resolve(data)
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
    
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

function verifyAnOtp(otp,userId){
    return new Promise(async(resolve,reject)=>{
        try{
            let otpDetails = await otpModel.Otp.findOne({user:new userModel.mongoose.Types.ObjectId(userId),code:otp})

            if(!otpDetails)
                return reject({message:null,error:"Invalid OTP code",code:401,data:null})
            
            let user = await userModel.User.findOne({_id:new userModel.mongoose.Types.ObjectId(userId)})

            if(otpDetails.isVerified)
                return reject({message:null,error:"This OTP code is already verified",code:401,data:null})

            let timeAfterOtpIssued = time.calculateTimeDifferent(otpDetails.createdAt,new Date())

            if(timeAfterOtpIssued>=120)
                return reject({message:null,error:"OTP code is expired. Please try with new OTP",code:498,data:null})

            if(user.status!=1){
                user.status=1

                otpDetails.isVerified = true
                otpDetails.isActive = false

                await user.save()
                await otpDetails.save()

                let data = {
                    userId:otpDetails.user._id
                }
                
                return resolve(data)
            }
            
            let uuid = codeGenerator.generateUUID()

            otpDetails.isVerified = true
            otpDetails.isActive = true
            otpDetails.uuid = uuid

            otpDetails.save().then((res)=>{
                let data = {
                    userId:otpDetails.user._id,
                    otpId:uuid
                }
            
                return resolve(data)
            }).catch((e)=>{return reject({message:"Unable to save to database",error:e.message,code:500,data:null})})
            
        }catch(e){
            return reject({message:"Unidenfied error! Please try again later",error:e.message,code:500,data:null})
        }
    })
}

exports.issueAnOtp = issueAnOtp
exports.verifyAnOtp = verifyAnOtp