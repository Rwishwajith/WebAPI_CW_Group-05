//**************LOG HISTORY ***********************
//28.08.2021        Ruchira Wishwajith        Created.
//28.08.2021        Ruchira Wishwajith        Created Middlewares Universal Access Identfier

const multer = require('multer')
const uuid = require('uuid')

const DIR = './temp/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null,uuid.v4()+fileName)
    }
})

const uploadMulter = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(req.files.length>5){
            req.fileValidationError = 'You uploaded more than 5 images'
            return cb(null, false, new Error('You uploaded more than 5 images')) 
        }
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {    
            req.fileValidationError = 'Invalid file type uploaded'
            return cb(null, false, new Error('goes wrong on the mimetype'))
        }
    }
})

exports.uploadMulter=uploadMulter
