// import mongoose
const mongoose = require("mongoose");
const dotenv = require('dotenv')
require('dotenv').config()

// create connect function to connect to database
const connect = () => {
  return mongoose.connect(`mongodb+srv://mohitsolanki:${process.env.PASSWORD}@cluster0.5uugeg2.mongodb.net/?retryWrites=true&w=majority`);
};

//exporting the connect function in index.js
module.exports = connect;
