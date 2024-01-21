const express=require("express");
const app=express();
require("dotenv").config({path:'./.env'})
const logger=require("morgan")
const ErorrHandlers=require("./utills/ErorrHandler.js");
const {generatedErorrs}= require("./middlewares/errors.js");
require("./models/db.js").connectDatabase();
const cors=require('cors');
const productRoute=require("./routes/productRoute.js");
const userRoute=require("./routes/userRoute.js")



//logger help to know which route is hit on console..
app.use(logger('tiny'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//use cors 
app.use(cors({ origin: true, credentials: true }));


//routes
app.use("/product",productRoute);
app.use("/user", userRoute);



//erorr handling...
app.all("*",(req,res,next)=>{
    next(new ErorrHandlers(`Requested Url Not Found ${req.url}`))
});
app.use(generatedErorrs);


//server start
app.listen(process.env.PORT,console.log('server run on port',process.env.PORT))