//**************LOG HISTORY ***********************
//28.08.2021       Deshani Rajapaksha       Created.
//28.08.2021       Deshani Rajapaksha       created a service for Mobile validator.

const config = require('config')
const axios = require('axios')

function validateMobile(contact,countryCode){
    return new Promise((resolve,reject)=>{
        let configApi = {
            method: 'GET',
            url: `${config.get("mobileValidation.url")}?access_key=${config.get("mobileValidation.apiKey")}&number=${contact}&country_code=${countryCode}`
        }
        axios(configApi).then((response)=>{
           return resolve(response)
        }).catch((e)=>{
            return reject({status:false,message:e.message,error:null,code:424,data:null})
        })
    })
}

exports.validateMobile=validateMobile