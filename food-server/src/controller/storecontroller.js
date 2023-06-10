const Store = require("../models/storemodel.js")
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


router.post("/store",uploadSingle("image"),async(req, res) => {
   try{

      const result =await cloudinary.uploader.upload(req.file.path)
   const store = await Store.create({
      id:req.body.id,
      name:req.body.name,
      category:req.body.category,
      price:req.body.price,
      image: result.url,
   })


   return res.status(200).send(store)
   } catch(err){
      console.log(err)
      return res.status(500).send({ message: err.message });
   }


 })
router.get("/store",async(req, res) => {

   try{
   const stores = await Store.find().lean().exec()

   

   return res.status(200).send({stores})

   } catch(err){
      return res.status(500).send({ message: err.message });
   }


 })


 module.exports =router