const bucketRef = require('../services/firebase').getBucket()
const uuid = require('uuid')

class GCS{
    constructor(){
      this.bucket = bucketRef
    }

    uploadImage(filePath){
      return new Promise((resolve,reject)=>{
        this.bucket.upload('./temp/'+filePath).then((res)=>{
          let downloadableUrl = 'https://firebasestorage.googleapis.com/v0/b/webapi-3e0ee.appspot.com/o/' + encodeURIComponent(filePath) + '?alt=media&token=' + uuid.v4()
          return resolve(downloadableUrl)
        }).catch((e)=>{
          return reject(e.message)
        })
      })
    }

}

exports.GCS=GCS