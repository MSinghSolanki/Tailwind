const express = require("express")
const router = express.Router();
const Razorpay = require("razorpay")
require("dotenv").config();


const instance = new Razorpay({ 
   key_id:process.env.KEY_ID, 
   key_secret: process.env.KEY_SECRET 
})



router.get('/',(req,res)=>{

   const options =  {
      amount: 1000,
      currency: "INR",
     }

      instance.orders.all(options , (err,order)=>{

 if(err){
   console.log(err);
 }else{
   console.log(order);
   res.send(order.id);
 }
     })


})

 router.post("/orders",async(req,res)=>{
try{
 
 let {amount} = req.body  
    const options =  {
         amount:Number(req.body.amount*100),
         currency: "INR",
        }

       
const order = await instance.orders.create(options);

console.log(order)

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
