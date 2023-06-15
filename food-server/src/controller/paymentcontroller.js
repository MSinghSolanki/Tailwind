const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto")
const Payment = require("../models/paymentmodel.js")

require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post("/checkout", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise (Razorpay expects amount in paise)
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Unable to create order",
    });
  }
});



router.post("/payment", async (req, res) => {
  try {
 
const {razorpay_order_id,razorpay_payment_id,razorpay_signature}
 =req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto.createHmac("sha256",process.env.KEY_SECRET)
                                          .update(body.toString())
                                          .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;
  
  if(isAuthentic){
  
  await Payment.create({
   razorpay_order_id,
   razorpay_payment_id,
   razorpay_signature,
  })
   res.redirect(`https://hungerandbeats.vercel.app//paymentsuccess?reference=${razorpay_payment_id}`)
  }else{
   res.status(500).json({
      success:false
   })
  }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500)
  }
});

module.exports = router;







// router.get('/',(req,res)=>{

  

    

//  if(err){
//    console.log(err);
//  }else{
//    console.log(order);
//    res.send(order.id);
//  }
//      })


// })

//  router.post("/orders",async(req,res)=>{
// try{
 
//  let {amount} = req.body  
//     const options =  {
//          amount:Number(req.body.amount*100),
//          currency: "INR",
//         }

       
// const order = await instance.orders.create(options);

// console.log(order)

// return res.status(200).json({
//    success:true,
//    order,
// });
// }
// catch(err){
// res.status(404).send({message:err.message})
// }
//  }
//  )


