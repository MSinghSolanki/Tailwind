const mongoose = require("mongoose")


const favouriteSchema = mongoose.Schema(
    {
      id:{type:Number,required:true},
     name: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String }]
    },
    {
        versionKey: false,
        timestamps: true,
      }
)

module.exports = mongoose.model("favourites",favouriteSchema)