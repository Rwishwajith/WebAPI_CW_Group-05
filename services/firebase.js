let firebase = require('firebase')
let admin = require("firebase-admin")
let config = require("config")

const serviceAccount = require('../config/firebaseStorage.json')

let configs = {
    apiKey: config.get("firebase.apiKey"),
    authDomain: config.get("firebase.authDomain"),
    projectId: config.get("firebase.projectId"),
    storageBucket: config.get("firebase.storageBucket"),
    messagingSenderId: config.get("firebase.messagingSenderId"),
    appId: config.get("firebase.appId"),
    measurementId: config.get("firebase.measurementId")
}

firebase.default.initializeApp(configs)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:"gs://webapi-group05.appspot.com"
})

function getAdminAuth(){
    return admin.auth()
}

function getAuth(){
    return firebase.default.auth()
}

function getBucket(){
    return admin.storage().bucket()
}

exports.getAuth=getAuth
exports.getBucket=getBucket
exports.getAdminAuth=getAdminAuth