const express = require ("express");
const app = express();
const connect = require ("./config/connect")
const cors = require("cors")

const paymentroute = require("./routes/paymentroutes.js")
app.use("/api",paymentroute)
app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));


app.listen(2754, async () => {
  try {
    
    await connect();

    } catch (err) {
      console.error(err.message);
    }
    console.log("listening on port 2754");
  });
  
  


  
  // const paymentRoute = require("./controller/paymentcontroller")
  
  
  // app.use("/api",paymentRoute)