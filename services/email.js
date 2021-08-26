const config = require('config')
const axios = require('axios')

function sendEmail(to,subject,text){
    return new Promise((resolve,reject)=>{
        let body={
            "personalizations":[{
                "to":[
                    {
                        "email":to,
                        "name":"John Doe"
                    }
                ],
                "subject":subject
            }],
            "content": [{
                "type": "text/plain", 
                "value": text
                }],
            "from":{
                "email":config.get("email.email"),
                "name":config.get("email.name")
            },
            "reply_to":{
                "email":config.get("email.replyEmail"),
                "name":config.get("email.name")
            }
        }

        var apiReqConfig = {
            method: 'post',
            url: config.get("email.url"),
            headers: { 
              'Authorization': `Bearer ${config.get("email.token")}`, 
              'Content-Type': 'application/json'
            },
            data : body
          }
        
        axios(apiReqConfig).then((res)=>{
            return resolve(true)
        }).catch((error)=>{
            return reject(error)
        })

    })
}

exports.sendEmail=sendEmail