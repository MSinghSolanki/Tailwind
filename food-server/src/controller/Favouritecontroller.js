const Favourite = require("../models/favouritemodel.js")
const express = require("express")
const router = express.Router();
const dotenv = require('dotenv')
require('dotenv').config()
const { upload,uploadSingle } = require("../middleware/fileupload.js");

const cloudinary = require("cloudinary").v2;


cloudinary.config({ 
  cloud_name: 'ddapx8jzk', 
  api_key: process.env.API_KEY, 
  api_secret:process.env.API_SECRET
});


router.post("/fav",uploadSingle("image"),async(req, res) => {
   try{

      const result =await cloudinary.uploader.upload(req.file.path)
   const order = await Favourite.create({
      name:req.body.name,
      price:req.body.price,
      image: result.url,
   })


   return res.status(200).send(order)
   } catch(err){
      console.log(err)
      return res.status(500).send({ message: err.message });
   }


 })
router.get("/fav",async(req, res) => {

   try{
   const orders = await Favourite.find().lean().exec()

   

   return res.status(200).send({orders})

   } catch(err){
      return res.status(500).send({ message: err.message });
   }


 })


 module.exports =router