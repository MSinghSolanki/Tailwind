const mongoose = require("mongoose")


const userSchema = mongoose.Schema(
    {
        name: {type:String,reuired:true},
        category: {type:String,reuired:true},
        image:{type:String,reuired:true},
        price:""
    }
)