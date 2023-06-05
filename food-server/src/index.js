const express = require ("express");
const connect = require ("./config/connect")
const app = express();
app.use(express.json());

const paymentRoute = require("./Routes/paymentRouter")


app.use("/api",paymentRoute)


app.listen(2754, async () => {
    try {
        
      await connect();

    } catch (err) {
      console.error(err.message);
    }
    console.log("listening on port 2754");
  });
  