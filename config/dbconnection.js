// Connect to mogodb using url
const mongoose = require("mongoose");
const { Config } = require(".");

exports.connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(Config.DB_URL, {  })
      .then(() => {
        console.log('Database connection established => ', Config.DB_URL);
        // seeders.createAdminIfNotExists()
      })
      .catch((err) => {
        console.error('MongoDB connection error', err);
      });

  } catch (error) {
    console.log("Failed to connect to database =>", error.message);
  }
};
