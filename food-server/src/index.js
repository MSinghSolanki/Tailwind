const express = require ("express");
const connect = require ("./src/config/connect.js")
const app = express();

const cors = require ("cors")

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const paymentRoute = require("./src/controller/paymentcontroller.js")
const orderRoute = require("./src/controller/ordercontroller.js")
const favRoute = require("./src/controller/Favouritecontroller.js")
const storeRoute = require("./src/controller/storecontroller.js")

app.use("/order",orderRoute)
app.use("/favourite",favRoute)
app.use("/api",paymentRoute)
app.use("/item",storeRoute)




app.listen(2754, async () => {
    try {
        
      await connect();
console.log("Listening to 2754")
    } catch (err) {
      console.error(err.message);
    }
    
  });
  