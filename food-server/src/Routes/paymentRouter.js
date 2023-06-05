const express = require("express")

 const router = express.Router();
 
const checkouts = require("../controller/paymentcontroller.js")


router.post("/create",checkouts)


module.exports = router;