
//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Scehma for Product Images

const productImageSchema = new mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    imageUrl: {
        type:String,
        default:'https://firebasestorage.googleapis.com/v0/b/webapi-group05.appspot.com/o/Eq_it-na_pizza-margherita_sep2005_sml.jpg?alt=media&token=399ed14c-9940-4a0a-ac1d-765d07fb312e' 
    },
    createdAt: {
        type:Date,
        default:Date()
    },
    updatedAt: {
        type:Date,
        default:Date()
    }
})

exports.productImageSchema = productImageSchema