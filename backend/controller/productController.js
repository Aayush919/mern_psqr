
const productModel=require('../models/ProductModel.js');
const { catchAsyncErorrs } = require("../middlewares/catchAsyncErorrs.js");
const ErorrHandler=require("../utills/ErorrHandler.js");
var QRCode = require('qrcode')


const generateQR = async (text) => {
    try {
       return await QRCode.toDataURL(text)
    } catch (err) {
        return null
    }
  }



  //@description //create new product
//@route post
//@access private
const create=catchAsyncErorrs(async(req,res,next)=>{

const {Name, receivedDate, receivedQuantity}=req.body;
if(!Name || !receivedDate || ! receivedQuantity){
   return next(new ErorrHandler(`please add all the fields ${e} !`, 400))
}
const d=new Date(receivedDate).toLocaleDateString()
const e=new Date(Date.now()).toLocaleDateString()
const num=parseInt(receivedQuantity);

if(d>e){
   return next(new ErorrHandler(`please enter date today and before ${e} !`, 400))
}


if(num<1){
   return next(new ErorrHandler("please enter the qauntiy greater than or equal to 1 !", 400))
}

const product=await productModel.create({
   Name,
   receivedDate, 
   receivedQuantity
})
if(!product){
   return next(new ErorrHandler("facing problem to creating new product !", 400))
}

const newQr=await generateQR(product._id.toString());
if(!newQr){
   return next(new ErorrHandler("facing problem to genrating qr code!", 400))
}
console.log(newQr);

product.qr=newQr;
product.save();
res.status(201).json({product});
})


  //@description //update product
//@route post
//@access private
const update=catchAsyncErorrs(async(req,res,next)=>{
   const {Name, receivedDate, receivedQuantity,productId}=req.body;

   if(!Name || !receivedDate || ! receivedQuantity ||!productId){
      return next(new ErorrHandler(`please add all the fields ${e} !`, 400))
   }
   
   const d=new Date(receivedDate).toLocaleDateString()
   const e=new Date(Date.now()).toLocaleDateString()  
   const num=parseInt(receivedQuantity);
if(d>e){
   return next(new ErorrHandler(`please add date equal to or less than ${e} !`, 400))
}

const currentP=await productModel.findById({_id:productId});
const disPatch=currentP.dispatchQantity;

if(num<1){
   return next(new ErorrHandler(`please enter the qauntiy greater than or equal to 1 !`, 400))
}


if(num<disPatch){
   return next(new ErorrHandler(`please enter the qauntiy greater than or equal to ${disPatch} !`, 400))
}

const updateP = await productModel.findByIdAndUpdate(
   {_id:productId},
  {$set:{Name,receivedDate,receivedQuantity}},
   { new: true }
 );
 if(!updateP){
   return next(new ErorrHandler("error whith updataion please try again !", 400))
 }

 res.status(200).json(updateP);
 
})



  //@description //dispatch product
//@route post
//@access private
const dispatch=catchAsyncErorrs(async (req,res,next)=>{
const productId=req.body.productId;

if(!productId){
   return next(new ErorrHandler("first id then dispatch", 404))
}

const date=new Date(Date.now()).toLocaleDateString();
const currentP=await productModel.findById({_id:productId});

if(!currentP){
   return next(new ErorrHandler("no product found whith this id !", 404))
}

if(currentP.dispatchQantity>=currentP.receivedQuantity){
   return next(new ErorrHandler("product already dispatch !", 400))
}


const updateP = await productModel.findByIdAndUpdate(
   {_id:productId},
  { $inc: { dispatchQantity: 1 },$set:{dispatchDate:date}},
   { new: true }
 );


 if(!updateP){
   return next(new ErorrHandler("error whith dipatch product !", 400))
 }


 res.status(200).json({updateP});
})


 //@description //show product on client side
//@route get
//@access public
const getAllProduct=catchAsyncErorrs(async(req,res,next)=>{
   
   const products = await productModel.find();

   res.status(200).json({products})
})



 //@description //get single product
//@route get
//@access public
const getOneProduct=catchAsyncErorrs(async (req,res,next)=>{
   const productId=req.body.productId;
   if(!productId){
      return next(new ErorrHandler("first id hmmm ..!", 404))
   }
   
const pr=await productModel.findOne({_id:productId}).exec();
 if(!pr){
   return next(new ErorrHandler("problem to get single product !", 400))
 }
res.status(200).json({pr});
})

 //@description delet exist product
//@route post
//@access public

const delet=catchAsyncErorrs(async(req,res,next)=>{
   const productId=req.body.productId
   const deletedProduct = await productModel.findByIdAndDelete(productId);

   if (!deletedProduct) {
      return next(new ErorrHandler("error whith delet product !", 400))
   }

   return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
})
module.exports={create,update,dispatch,getAllProduct,getOneProduct,delet};
