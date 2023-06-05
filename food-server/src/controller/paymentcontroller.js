
const Razorpay = require("razorpay")
require("dotenv").config();




const instance = new Razorpay({ 
   key_id:process.env.KEY_ID, 
   key_secret: process.env.KEY_SECRET 
})


 const checkout = async(req,res)=>{

    const options =  {
         Amount: 1000000,
         Currency: "INR",
        }

const order = await instance.orders.create(options);
console.log(order)
res.status(200).json({
   success:true,
});
}


module.exports = checkout;

// const express = require("express")

// const router = express.Router();

// const Orders = require ("../models/ordermodel")

// export const orderCreate=(req,res,next)=>{
// try{

//  const order =  Orders.create({
//     Amount: req.body.Amount,
//     Currency: req.body.Currency,
//     Receipt: req.body.Receipt,
// })
// console.log(req.body)

// }catch(err){


// }


// }