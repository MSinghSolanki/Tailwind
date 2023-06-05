// import mongoose
const mongoose = require("mongoose");

// create connect function to connect to database
const connect = () => {
  return mongoose.connect("mongodb+srv://mohitsolanki:mongodb@cluster0.clrq7sh.mongodb.net/?retryWrites=true&w=majority");
};

//exporting the connect function in index.js
module.exports = connect;
