const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        Amount: {type:Number,required:true},
  Currency: {type:String,default:"INR"},
    },
    {
        versionKey: false,
        timestamps: true,
      }
);

module.exports = mongoose.model("order",orderSchema)