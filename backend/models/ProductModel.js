const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // userId:{
    // },
    Name:{
        type:String,
        required:[true,'name is required !']
    },
    receivedDate:{
        type:String,
        required:[true,'Received Date is required !']
        
    },
    receivedQuantity:{
        type:Number,
        required:[true,'Received Quantity is required !']
    }
    ,
    dispatchDate:{
      type:String,
    },
    dispatchQantity:{
        type:Number,
    }
    ,
    qr:{
        type:String,
    }

},{
    timestamps:true
})


module.exports=mongoose.model("Product",productSchema);



