const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        Amount: {type:Number,required:true},
  Currency: {type:String,default:"INR"},
  Receipt: {type:String,required:true},
    },
    {
        versionKey: false,
        timestamps: true,
      }
);

module.exports = mongoose.model("order",orderSchema)