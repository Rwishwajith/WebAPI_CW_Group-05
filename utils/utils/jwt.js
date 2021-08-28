//**************LOG HISTORY ***********************
//28.08.2021       Deshani Rajapaksha       Created.
//28.08.2021       Deshani Rajapaksha       Added Json Access Token

const config = require('config')
const jwt = require('jsonwebtoken')
const jwtrsa = config.get('accessTokens.jwtRsa')

function generateJWT(payload){
    return jwt.sign(payload, jwtrsa)
}

function unpackToken(accessToken){
    return jwt.decode(accessToken)
}

function makePayloadWithUser(user){
    let payload = {
        'id':user.id,
        'firstName':user.firstName,
        'lastName':user.lastName,
        'address':user.address,
        'email':user.email,
        'mobileNumber':user.mobileNumber,
        'type':user.type,
        'isSocial':user.isSocial,
    }
    return payload
}

exports.generateJWT=generateJWT
exports.unpackToken=unpackToken
exports.makePayloadWithUser=makePayloadWithUser