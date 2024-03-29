const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../logger");
mongoose.Promise = global.Promise;
const mongoUrl = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Berhasil Connect Ke Database");
      })
      .catch((e) => {
        console.log(e);
        console.log("Gagal Connect Ke Database");
      });
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

module.exports = connectToDatabase;
