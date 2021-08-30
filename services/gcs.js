//**************LOG HISTORY ***********************
//28.08.2021        Ruchira Wishwajith        Created.
//28.08.2021        Ruchira Wishwajith        Created Services for integration of google cloud services

const bucketRef = require('../services/firebase').getBucket()
const uuid = require('uuid')

class GCS{
    constructor(){
      this.bucket = bucketRef
    }

    uploadImage(filePath){
      return new Promise((resolve,reject)=>{
        this.bucket.upload('./temp/'+filePath).then((res)=>{
          let downloadableUrl = 'https://firebasestorage.googleapis.com/v0/b/webapi-group05.appspot.com/o/Eq_it-na_pizza-margherita_sep2005_sml.jpg?alt=media&token=399ed14c-9940-4a0a-ac1d-765d07fb312e' + encodeURIComponent(filePath) + '?alt=media&token=' + uuid.v4()
          return resolve(downloadableUrl)
        }).catch((e)=>{
          return reject(e.message)
        })
      })
    }

}

exports.GCS=GCS