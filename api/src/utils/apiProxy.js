const mongoose = require("mongoose");

const ApiProxy = async (database) => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(database);
    console.log("Connection to the database success");
  } catch (err) {
    console.log("Connection to the database impossible");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = ApiProxy;
