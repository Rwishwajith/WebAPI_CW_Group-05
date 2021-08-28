//**************LOG HISTORY ***********************
//28.08.2021       Deshani Rajapaksha       Created.
//28.08.2021       Deshani Rajapaksha       Created a Service for  SMS Authentification.

const config = require('config')
const https = require('https');

const axios = require('axios')

function sendSms(mobileNumber,content){
    return new Promise((resolve,reject)=>{
        try{
            let url = config.get('sms.url')
            let body = {
                user_id: config.get('sms.userId'),
                api_key: config.get('sms.apiKey'),
                sender_id: config.get('sms.senderId'),
                to: mobileNumber.toString(),
                message: content
            }
            axios.post(url,body).then(_ => {return resolve(true)}).catch(error => {return reject(error)})
        }catch(e){
            return reject(e)
        }
    })
}

exports.sendSms=sendSms