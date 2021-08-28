//**************LOG HISTORY ***********************
//28.08.2021        Ruchira Wishwajith        Created.
//28.08.2021        Ruchira Wishwajith        Created Middlewares for Permission Checker


const jwt = require('../utils/jwt')

function checkAdminPermissions(req, res, next) {
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        let payload = jwt.unpackToken(token)

        if(payload.type!=1)
            return res.status(403).send({
                "success": false,
                "message": "You are not authorized to use this endpoint", 
                "data": null
            })
            
        next()
    }catch(e){
        return res.status(500).send({
            "success": false,
            "message": e.message, 
            "data": null
        })
    }
}

exports.checkAdminPermissions=checkAdminPermissions
