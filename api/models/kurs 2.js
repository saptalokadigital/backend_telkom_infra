const mongoose = require("mongoose");

const kurSchema = mongoose.Schema({
  usdToIdr: Number,
});
module.exports = mongoose.model("kurs", kurSchema);
