// Connection with the Db

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoConnect = () => {
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongodb connected");
  });
};
module.exports = mongoConnect;
