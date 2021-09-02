/**************LOG HISTORY ***********************
28.08.2021       Sandaruwani Weerasinghe       Created.
28.08.2021       Sandaruwani Weerasinghe       added validators.
29.08.2021       Ruchira Wishwajith            Code Refactoring
*/
const mobileValidate = require('../services/mobileValidate')

function validatePassword(password){
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm
    return password.match(pattern)!=null
}

function validateConfirmPassword(password,confirmPassword){
    return password===confirmPassword
}

function validateEmptyFields(...args){
    let is_valid = true
    args.forEach((arg)=>{
        if(typeof(arg)==Array){
            if(arg.length==0)
                is_valid=false
        }
        else if(arg===undefined || arg==="")
            is_valid = false
    })
    return is_valid
}

function isNumber(...args){
    let pattern = /^[0-9]+$/gm
    let is_valid = true
    args.forEach((arg)=>{
        if(typeof(otpCode)!=Number && arg.match(pattern)==null)
            is_valid = false
    })
    return is_valid
}

async function validateMobileNumber(contact,countryCode){
    return new Promise((resolve,reject)=>{
        mobileValidate.validateMobile(contact,countryCode).then((result)=>{
            if(result.data.success===false)
                return reject({status:false,message:null,error:result.data.error.info,code:400,data:null})
            else if(result.data.valid===false)
                return reject({status:false,message:null,error:"Invalid mobile number format",code:400,data:null})
            else
                return resolve({status:true,data:result.data.international_format.slice(1,result.data.international_format.length)})
        }).catch((e)=>{
            console.log(e)
            return reject(e)
        })
    })
}

function validateEmail(contact){
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
    return contact.match(pattern)!=null?1:0
}

async function validateContactType(contact){
    return new Promise((resolve,reject)=>{
        validateMobileNumber(contact,"LK").then((res)=>{
            resolve({status:1,data:res.data})
        }).catch((e)=>{
            if(validateEmail(contact))
                resolve({status:0,data:contact})
            resolve({status:-1})
        })
    })
}

exports.validatePassword=validatePassword
exports.validateConfirmPassword=validateConfirmPassword
exports.validateEmptyFields=validateEmptyFields
exports.validateMobileNumber=validateMobileNumber
exports.validateEmail=validateEmail
exports.validateContactType=validateContactType
exports.isNumber=isNumber