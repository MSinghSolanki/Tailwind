const Favourite = require("../models/favouritemodel.js")
const express = require("express")
const router = express.Router();



router.post("/fav", async (req, res) => {
   try {
     const favourite = await Favourite.create({
      id: req.body.id,
       name: req.body.name,
       price: req.body.price,
       image: req.body.image,
     });
     return res.status(200).send(favourite);
   } catch (err) {
     console.log(err);
     return res.status(500).send({ message: err.message });
   }
 });
router.get("/fav",async(req, res) => {

   try{
   const favourites = await Favourite.find().lean().exec()

   

   return res.status(200).send({favourites});

   } catch(err){
      return res.status(500).send({ message: err.message });
   }


 })


 module.exports =router