const mongoose = require("mongoose")


const favouriteSchema = mongoose.Schema(
    {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String }]
    },
    {
        versionKey: false,
        timestamps: true,
      }
)

module.exports = mongoose.model("favourite",favouriteSchema)