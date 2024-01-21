const express=require('express');
const { create, update ,dispatch, getAllProduct, getOneProduct, delet} = require('../controller/productController.js');
const router=express.Router();
const {protect}=require("../middlewares/authMiddleware.js")

router.post("/create",protect,create);
router.post("/update",protect,update)
router.post("/dispatch",protect,dispatch)
router.get("/getAllProduct",getAllProduct)
router.post("/getOneProduct",getOneProduct);
router.post("/delet",protect,delet)


module.exports=router;