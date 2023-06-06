const express = require ("express")

const router = express.Router();

const Order = require("../models/ordersmodel")

router.post("/ordering",async(req,res)=>{
 try{
  
 const orders = await Order.create(req.body)
 
 return res.status(200).json({
    success:true,
    order,
 });
 }
 catch(err){
 res.status(404).send({message:err.message})
 }
  }
  )
 
 
 module.exports = router;
 