// const express = require("express")

// const router = express.Router();
// const Razorpay = require("razorpay")

// const Orders = require("../models/ordermodel")

// require("dotenv").config();


// var instance = new Razorpay(
//     { key_id:process.env.KEY_ID, key_secret:process.env.KEY_SECRET  })

// instance.payments.fetch(Orders)


// router.post('/',async(req,res)=>{
//     console.log("create orderID request",req.body)
// try{
// const order = await Orders.create({
//     Amount: req.body.Amount,
//     Currency: req.body.Currency,
//     Receipt: req.body.Receipt,
// })

// instance.orders.create(options,function(err,order){
//     console.log(order);
//     res.send({order})
// })
// }
// catch(err){
//     return res.status(500).send(err);
// }
// })
// router.get('/',async(req,res)=>{
//     console.log("create orderID request",req.body)
// try{
// const order = await Orders.find().lean().exec()
 
//     res.send({order})

// }
// catch(err){
//     return res.status(500).send(err);
// }
// })


// module.exports = router;