const express = require("express")

 const router = express.Router();
const checkout = require("../controller/paymentcontroller.js")

router.route("/checkout").post(checkout);


module.exports = router;