var userModel=require("../models/userModel.js")
 var generatToken=require("../config/generatToken.js")
 const ErorrHandler=require("../utills/ErorrHandler.js");
var bcrypt = require('bcrypt');
const { catchAsyncErorrs } = require("../middlewares/catchAsyncErorrs.js");



//@description //create new user
//@route post
//@access public

const registerUser =catchAsyncErorrs(async (req, res,next) => {
    console.log('registerUser')
    
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(422).json({
            error:"please add all the fields"
        })
    }

    const existUser = await userModel.findOne({ email: email })  
    if (existUser) {
        console.log("exist")
        return next(new ErorrHandler("user already exist whith this mail>> !", 409))
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
   
    const user = await userModel.create({
        username,
            email,
        password:hash

    })
  
    if (user) {
        return  res.status(200).json({
            username: user.username,
            id: user._id,
            email: user.email,
            token: generatToken(user._id)
        })
    } else {
        res.status(404).json({error:"user not found..."})
    }

})

//@description //log in user
//@route post
//@access public

const authUser = catchAsyncErorrs(async (req, res,next) => {
    console.log('authUser')
    const { email, password } = req.body;
    console.log(email)
    if (!email || !password) {
        return next(new ErorrHandler("please add all the fields.. !", 409))
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return next(new ErorrHandler("user not found... !", 409))
    }

    const match =await bcrypt.compare(password, user.password);
    if (email && match) {
      return  res.json({
            _id:user.id,
            username: user.username,
            email: user.email,
            token: generatToken(user.id),
        })
    }
    else {
        return next(new ErorrHandler("password wrong..!", 400))
    }
})






module.exports = { registerUser, authUser }

