const express = require ("express");
const connect = require ("./config/connect.js")
const app = express();

const cors = require ("cors")

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const paymentRoute = require("./controller/paymentcontroller.js")
const orderRoute = require("./controller/ordercontroller.js")
const favRoute = require("./controller/Favouritecontroller.js")
const storeRoute = require("./controller/storecontroller.js")

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
  