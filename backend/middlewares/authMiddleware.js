const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel.js");
const dotenv = require('dotenv');
dotenv.config();
const ErorrHandler=require("../utills/ErorrHandler.js");
const { catchAsyncErorrs } = require('./catchAsyncErorrs.js');

const protect = catchAsyncErorrs(async (req, res, next) => {
    let token;
   
   

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWt_Secret);
            req.user = await userModel.findById(decoded.id).select("-password");
            next()   

    }

    if (!token) {
    
        return next(new ErorrHandler("not permitteted auth failed!", 409))
    }

})





module.exports = { protect };