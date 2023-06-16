const Order = require("../models/ordersmodel.js")
const express = require("express")
const router = express.Router();



router.post("/create", async (req, res) => {
   try {
     const order = await Order.create({
      id: req.body.id,
       name: req.body.name,
       price: req.body.price,
       image: req.body.image,
     });
 
     return res.status(200).send(order);
   } catch (err) {
     console.log(err);
     return res.status(500).send({ message: err.message });
   }
 });
router.get("/create",async(req, res) => {

   try{
   const orders = await Order.find().lean().exec()

   

   return res.status(200).send({orders})

   } catch(err){
      return res.status(500).send({ message: err.message });
   }


 })
 router.delete("/delete", async (req, res) => {
  try {
    await Order.deleteMany(); // Delete all orders

    return res.status(200).send({ message: "All items deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;


 module.exports =router