/**************LOG HISTORY ***********************
28.08.2021       Sandaruwani Weerasinghe       Created.
28.08.2021       Sandaruwani Weerasinghe       Create authentication for New Users.
28.08.2021       Ruchira Wishwajith            Created the relationships with models, utils and services and helpers
*/

const userModel = require('../models/user')

const auth = require('../services/firebase').getAuth()

const otp = require('../helpers/otp')

module.exports=((data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let isUserAlreadyRegistered = (await userModel.User.find({email:data.email})).length===0

            if(!isUserAlreadyRegistered)
                return reject({message:null,error:'User already registered',code:409,data:null})

            auth.createUserWithEmailAndPassword(data.email, data.password).then((userInstance) => {
                let user = new userModel.User({firebaseUid:userInstance.user.uid,email:data.email,firstName:data.firstName,
                    lastName:data.lastName,mobileNumber:data.mobileNumber,address:data.address,isSocial:data.isSocial,type:data.type})
                user.save().then((res)=>{
                    let data = {
                        userId:user._id,
                    }
                    otp.issueAnOtp(user.email,0).then((result)=>{
                        return resolve(data)
                    }).catch((e)=>{
                        return reject(e)
                    })
                }).catch((e)=>{return reject({message:'Failed to save user in the database.Please try again',error:e.message,code:500,data:null})})
            }).catch((e) => {
                return reject({message:'Unable to create user',error:e.message,code:500,data:null})
            })

        }catch(e){
            return reject({message:"Unidenfied error! Please try again later",error:e.message,code:500,data:null})
        }
    })
})