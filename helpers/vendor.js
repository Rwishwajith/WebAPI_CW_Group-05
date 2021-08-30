/***************LOG HISTORY ***********************
29.08.2021        Ruchira Wishwajith        Created the file.
30.08.2021        Sandaruwani Weerasinghe   get all for vendors.
30.08.2021        Deshani Rajapaksha        Created a POST Method for Add New Vendor.
*/

function getAll(){
    return new Promise(async(resolve,reject)=>{
        try{
            let vendors = await vendorModel.Vendor.find()
        
            resolve(vendors)
        }catch(e){
            return reject({message:"Undetected error",error:e.message,code:500,data:null})
        }
    })
}

