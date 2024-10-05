const mongoose = require("mongoose");
console.log(process.env.NODE_ENV)

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConn;
