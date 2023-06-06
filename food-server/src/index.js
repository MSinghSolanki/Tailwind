const express = require ("express");
const connect = require ("./config/connect")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const paymentRoute = require("./controller/paymentcontroller")


app.use("/api",paymentRoute)


app.listen(2754, async () => {
    try {
        
      await connect();

    } catch (err) {
      console.error(err.message);
    }
    console.log("listening on port 2754");
  });
  